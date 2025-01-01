// ==UserScript==
// @name         自动计算并提交算术题
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  自动计算并提交9dmgamemod.com及其子域名上的算术题，兼容两种验证方式，支持回车提交
// @author       Ayndpa
// @match        *://*.9dmgamemod.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 第一种验证方式：查找包含算术题的<b>标签
    const mathProblemB = document.querySelector('b');
    if (mathProblemB) {
        const problemText = mathProblemB.innerText.trim();
        // 使用正则表达式提取算术题中的数字和运算符
        const matches = problemText.matchAll(/(\d+)\s*([\+\-])?/g);
        if (matches) {
            let result = 0;
            let operator = '+'; // 默认第一个数字是正数

            for (const match of matches) {
                const num = parseInt(match[1], 10);
                if (operator === '+') {
                    result += num;
                } else if (operator === '-') {
                    result -= num;
                }
                // 更新下一个运算符
                operator = match[2] || '+'; // 如果没有下一个运算符，默认为加法
            }

            // 查找输入框并填写答案
            const answerInput = document.querySelector('input[name="answer"]');
            if (answerInput) {
                answerInput.value = result;

                // 查找提交按钮并点击
                const submitButton = document.querySelector('input[name="secqsubmit"]');
                if (submitButton) {
                    submitButton.click();
                }
            }
        }
    }

    // 第二种验证方式：查找包含算术题的<span>标签
    const num1 = document.getElementById('num1');
    const num2 = document.getElementById('num2');
    if (num1 && num2) {
        const num1Value = parseInt(num1.innerText.trim(), 10);
        const num2Value = parseInt(num2.innerText.trim(), 10);
        const result = num1Value + num2Value;

        // 查找输入框并填写答案
        const answerInput = document.getElementById('inp1');
        if (answerInput) {
            answerInput.value = result;

            // 模拟按下回车键
            const enterKeyEvent = new KeyboardEvent('keydown', {
                key: 'Enter',
                code: 'Enter',
                keyCode: 13,
                which: 13,
                bubbles: true
            });
            answerInput.dispatchEvent(enterKeyEvent);
        }
    }
})();
