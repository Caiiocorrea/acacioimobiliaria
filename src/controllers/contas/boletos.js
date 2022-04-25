'use strict';
const puppeteer = require('puppeteer');
const boleto = require('../../models/boletos.js');
const http = require('http');
const fs = require('fs');

const GetBoletos = async (req, res) => {
    try {
        const data = req.body

        if (!data.cpf && !data.contrato) return res.status(400).send({ message: 'Dados incompletos.' });
        else if (!data.cpf) return res.status(400).send({ message: 'CPF não informado.' });
        else if (!data.contrato) return res.status(400).send({ message: 'Contrato não informado.' });
        else
            (async () => {
                const browser = await puppeteer.launch({
                    headless: true,
                    args: ['--no-sandbox', '--disable-setuid-sandbox']
                });
                const page = await browser.newPage();
                const timeout = 5000;
                page.setDefaultTimeout(timeout);

                async function waitForSelectors(selectors, frame, options) {
                    for (const selector of selectors) {
                        try {
                            return await waitForSelector(selector, frame, options);
                        } catch (err) {
                            console.error(err);
                        }
                    }
                    throw new Error('Could not find element for selectors: ' + JSON.stringify(selectors));
                }

                async function scrollIntoViewIfNeeded(element, timeout) {
                    await waitForConnected(element, timeout);
                    const isInViewport = await element.isIntersectingViewport({ threshold: 0 });
                    if (isInViewport) {
                        return;
                    }
                    await element.evaluate(element => {
                        element.scrollIntoView({
                            block: 'center',
                            inline: 'center',
                            behavior: 'auto',
                        });
                    });
                    await waitForInViewport(element, timeout);
                }

                async function waitForConnected(element, timeout) {
                    await waitForFunction(async () => {
                        return await element.getProperty('isConnected');
                    }, timeout);
                }

                async function waitForInViewport(element, timeout) {
                    await waitForFunction(async () => {
                        return await element.isIntersectingViewport({ threshold: 0 });
                    }, timeout);
                }

                async function waitForSelector(selector, frame, options) {
                    if (!Array.isArray(selector)) {
                        selector = [selector];
                    }
                    if (!selector.length) {
                        throw new Error('Empty selector provided to waitForSelector');
                    }
                    let element = null;
                    for (let i = 0; i < selector.length; i++) {
                        const part = selector[i];
                        if (element) {
                            element = await element.waitForSelector(part, options);
                        } else {
                            element = await frame.waitForSelector(part, options);
                        }
                        if (!element) {
                            throw new Error('Could not find element: ' + selector.join('>>'));
                        }
                        if (i < selector.length - 1) {
                            element = (await element.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
                        }
                    }
                    if (!element) {
                        throw new Error('Could not find element: ' + selector.join('|'));
                    }
                    return element;
                }


                async function querySelectorsAll(selectors, frame) {
                    for (const selector of selectors) {
                        const result = await querySelectorAll(selector, frame);
                        if (result.length) {
                            return result;
                        }
                    }
                    return [];
                }

                async function querySelectorAll(selector, frame) {
                    if (!Array.isArray(selector)) {
                        selector = [selector];
                    }
                    if (!selector.length) {
                        throw new Error('Empty selector provided to querySelectorAll');
                    }
                    let elements = [];
                    for (let i = 0; i < selector.length; i++) {
                        const part = selector[i];
                        if (i === 0) {
                            elements = await frame.$$(part);
                        } else {
                            const tmpElements = elements;
                            elements = [];
                            for (const el of tmpElements) {
                                elements.push(...(await el.$$(part)));
                            }
                        }
                        if (elements.length === 0) {
                            return [];
                        }
                        if (i < selector.length - 1) {
                            const tmpElements = [];
                            for (const el of elements) {
                                const newEl = (await el.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
                                if (newEl) {
                                    tmpElements.push(newEl);
                                }
                            }
                            elements = tmpElements;
                        }
                    }
                    return elements;
                }

                async function waitForFunction(fn, timeout) {
                    let isActive = true;
                    setTimeout(() => {
                        isActive = false;
                    }, timeout);
                    while (isActive) {
                        const result = await fn();
                        if (result) {
                            return;
                        }
                        await new Promise(resolve => setTimeout(resolve, 100));
                    }
                    throw new Error('Timed out');
                }
                {
                    const targetPage = page;
                    await targetPage.setViewport({ "width": 1366, "height": 636 })
                }
                {
                    const targetPage = page;
                    const promises = [];
                    promises.push(targetPage.waitForNavigation());
                    await targetPage.goto('http://gerenciadordeimobiliarias.com.br/boletos/acacio');
                    await Promise.all(promises);
                }
                {
                    const targetPage = page;
                    const element = await waitForSelectors([["aria/CPF / CNPJ"], ["body > div.login-box > div.login-box-body > form > div:nth-child(5) > input"]], targetPage, { timeout, visible: true });
                    await scrollIntoViewIfNeeded(element, timeout);
                    await element.click({ offset: { x: 51, y: 16.5625 } });
                }
                {
                    const targetPage = page;
                    const element = await waitForSelectors([["aria/CPF / CNPJ"], ["body > div.login-box > div.login-box-body > form > div:nth-child(5) > input"]], targetPage, { timeout, visible: true });
                    await scrollIntoViewIfNeeded(element, timeout);
                    const type = await element.evaluate(el => el.type);
                    if (["textarea", "select-one", "text", "url", "tel", "search", "password", "number", "email"].includes(type)) {
                        await element.type(data.cpf);
                    } else {
                        await element.focus();
                        await element.evaluate((el, value) => {
                            el.value = value;
                            el.dispatchEvent(new Event('input', { bubbles: true }));
                            el.dispatchEvent(new Event('change', { bubbles: true }));
                        }, data.cpf);
                    }
                }
                {
                    const targetPage = page;
                    const element = await waitForSelectors([["aria/Contrato"], ["body > div.login-box > div.login-box-body > form > div:nth-child(6) > input"]], targetPage, { timeout, visible: true });
                    await scrollIntoViewIfNeeded(element, timeout);
                    await element.click({ offset: { x: 102, y: 16.5625 } });
                }
                {
                    const targetPage = page;
                    const element = await waitForSelectors([["aria/Contrato"], ["body > div.login-box > div.login-box-body > form > div:nth-child(6) > input"]], targetPage, { timeout, visible: true });
                    await scrollIntoViewIfNeeded(element, timeout);
                    const type = await element.evaluate(el => el.type);
                    if (["textarea", "select-one", "text", "url", "tel", "search", "password", "number", "email"].includes(type)) {
                        await element.type(data.contrato);
                    } else {
                        await element.focus();
                        await element.evaluate((el, value) => {
                            el.value = value;
                            el.dispatchEvent(new Event('input', { bubbles: true }));
                            el.dispatchEvent(new Event('change', { bubbles: true }));
                        }, data.contrato);
                    }
                }
                {
                    const targetPage = page;
                    const promises = [];
                    promises.push(targetPage.waitForNavigation());
                    const element = await waitForSelectors([["aria/Entrar"], ["body > div.login-box > div.login-box-body > form > div.row > div > button"]], targetPage, { timeout, visible: true });
                    await scrollIntoViewIfNeeded(element, timeout);
                    await element.click({ offset: { x: 135, y: 14.5625 } });
                    await Promise.all(promises);
                }
                {
                    // PERCORRE A TABELA DE BOLETOS E SALVA NO BANCO DE DADOS
                    const data = await page.evaluate(() => {
                        const tds = Array.from(document.querySelectorAll('body > div.wrapper > div > div > section.content > div > div.box-body > div.table-responsive > table > tbody > tr'))
                        return tds.map(td => {
                            return {
                                Nr_Contrato: td.cells[0].innerText,
                                Nr_Documento: td.cells[1].innerText,
                                Valor: td.cells[2].innerText,
                                Vencimento: td.cells[3].innerText,
                                Linha_Digitavel: td.cells[4].innerText,
                                Download: Array.from(td.querySelectorAll('a'))[0].href

                            }
                        })
                    });

                    let oldcadastrados = [], newcadastrados = [];
                    for (let i = 0; i < data.length; i++) {
                        await boleto.findOne(data[i]).then(async result => {
                            if (result === null) {
                                await boleto.create(data[i]).then(() => {
                                    newcadastrados.push(data[i]);
                                })
                            }
                            else {
                                oldcadastrados.push(data[i])

                                const download = async (url, dest, cb) => {
                                    const file = fs.createWriteStream(dest);

                                    http.get(url, (response) => {
                                        response.pipe(file);
                                        file.on('finish', () => {
                                            file.close(cb);
                                        });
                                    });

                                }
                                await download(data[0].Download, `./${data[0].Linha_Digitavel.replace(/\D/g, '')}.pdf`)
                            }
                        }).catch(async (err) => {
                            res.status(400).send({ error: err.message })
                        })
                    }

                    await res.status(200).send({
                        data: {
                            oldcadastrados: oldcadastrados,
                            newcadastrados: newcadastrados
                        }
                    })
                }

                await browser.close();
            })();

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    GetBoletos
}