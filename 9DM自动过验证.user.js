// ==UserScript==
// @name         自动计算并提交算术题
// @namespace    http://tampermonkey.net/
// @version      1.1
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
        const matches = problemText.match(/(\d+)\s*([\+\-])\s*(\d+)\s*([\+\-])\s*(\d+)/);
        if (matches) {
            const num1 = parseInt(matches[1], 10);
            const operator1 = matches[2];
            const num2 = parseInt(matches[3], 10);
            const operator2 = matches[4];
            const num3 = parseInt(matches[5], 10);

            // 计算答案
            let result;
            if (operator1 === '+' && operator2 === '+') {
                result = num1 + num2 + num3;
            } else if (operator1 === '+' && operator2 === '-') {
                result = num1 + num2 - num3;
            } else if (operator1 === '-' && operator2 === '+') {
                result = num1 - num2 + num3;
            } else if (operator1 === '-' && operator2 === '-') {
                result = num1 - num2 - num3;
            } else {
                console.log('无法识别的运算符');
                return;
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
