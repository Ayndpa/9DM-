// ==UserScript==
// @name         自动计算并提交算术题
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  自动计算并提交9dmgamemod.com及其子域名上的算术题
// @author       你的名字
// @match        *://*.9dmgamemod.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 查找包含算术题的<b>标签
    const mathProblem = document.querySelector('b');
    if (mathProblem) {
        const problemText = mathProblem.innerText.trim();
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
})();
