const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: 'your-api-key',
})
const openai = new OpenAIApi(configuration)

async function generateMigration (code) {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `convert from Vue2 to Vue3: \n ${code}`,
      temperature: 0,
      max_tokens: 512,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    return (response?.data?.choices[0].text || '').trim()
  } catch (error) {
    console.error('application error:', error)
    // throw new Error('something wrong')
  }
}

module.exports = generateMigration

// const filePath = 'src/components/PopularTags.vue'
// const code = readFile(filePath)

// generateExplanation(code).then(output => console.log(output))

// generateExplanation(code)
//   .then((explanation) => console.log(explanation))
// .catch((error) => console.error(error))
