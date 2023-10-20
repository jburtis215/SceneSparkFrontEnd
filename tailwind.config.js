module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'light-green': '#a3d7a4',
                'light-gray': '#d3d3d3',
                'blue-gray': '#9da6cb',
            },
            margin: {
                '1/10': '10%',
            },
            maxWidth: {
                '2/3': '88%',
                '1000': '1000px',
            },
            width: {
                '4/5': '80%',
                '120per':'101vw',
                '340':'340px',
                '900' :'900px',
                '600' :'600px',
                '700' :'700px',
                '880' :'880px',
            },
            height: {
                '4p': '4px',
                '60per':'60vh',
                '50per':'50vh',
                '110':'110px',
                '400':'400px',
                '500':'500px',
                '700':'700px',
                '600':'600px',
                '900':'900px',
            },
        },
    },
    plugins: [],
}
