const { default: Form } = require('./Form')

const Landing = () => {
  return (
    <section className="w-full h-fit p-8 flex flex-col items-center gap-12">
      <h1 className="text-center">Match Making with Fred</h1>

      <Form />
    </section>
  )
}

export default Landing
