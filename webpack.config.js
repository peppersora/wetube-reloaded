// 굉장히 오래된 자스 코드만 이해할 수 있음
//  주의할 점 두가지
// 1. entry: 우리가 처리하고자하는 파일 =>main.js
// webpack이 읽을 configuration 파일으 내보낼것임
// console.log(__dirname); => 파일까지의 전체경로
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");

// console.log(path.resolve(__dirname, "assets","js"));
const BASE_JS = "./client/js/";
module.exports = {
    entry: {
        main: BASE_JS + "main.js",
        videoPlayer:  BASE_JS + "videoPlayer.js",
        recorder:  BASE_JS + "recorder.js",
        commentSection:  BASE_JS + "commentSection.js",
    },
    mode: "development",
    watch: true,
    plugins: [
        new MiniCssExtractPlugin({
            filename:"css/styles.css",
        }),
    ],
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "assets"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use:{
                    loader: "babel-loader",
                    options: {
                      presets: [["@babel/preset-env", { targets: "defaults" }]],
                    },
                },
            }, 
            {
                test: /\.scss/,
                use:[MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            }         
        ],
    },
};