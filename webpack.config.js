var path = require("path");

// Export the configuration
module.exports = (env, argv) => {
    var isDev = argv.mode === "development";

    // Return the configuration
    return {
        // Main project files
        entry: "./src/index.ts",

        // Output information
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "demoSecurityGroup" + (isDev ? "" : ".min") + ".js"
        },

        // Resolve the file names
        resolve: {
            extensions: [".css", ".js", ".scss", ".ts"]
        },

        // Compiler Information
        module: {
            rules: [
                // Handle SASS Files
                {
                    test: /\.s?css$/,
                    use: [
                        // Create the style nodes from the CommonJS code
                        { loader: "style-loader" },
                        // Translate css to CommonJS
                        { loader: "css-loader" },
                        // Compile sass to css
                        { loader: "sass-loader" }
                    ]
                },
                // Handle TypeScript Files
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        // Step 2 - Compile JS (ES5) to current standards
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ["@babel/preset-env"]
                            }
                        },
                        // Step 1 - Compile TypeScript to JavaScript (ES5)
                        {
                            loader: "ts-loader"
                        }
                    ]
                }
            ]
        }
    };
}