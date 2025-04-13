import {createSystem, defaultConfig, defineConfig} from "@chakra-ui/react";

const themeConfig = defineConfig({
    theme: {
        tokens: {
            colors: {
                green: "#1fd760"
            }
        },

        semanticTokens: {
            colors: {
                success: { value: "#1fd760" },
            },
        },
    },
})

export default createSystem(defaultConfig, themeConfig)