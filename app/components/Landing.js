import MyLottie from './MyLottie'

const { default: Form } = require('./Form')

const Landing = () => {
  return (
    <section id="section" className="w-full h-full overflow-y-scroll md:overflow-hidden p-4 flex flex-col md:flex-row items-center gap-12 relative">
      <div className="w-[200vw] md:w-full md:h-full fixed -z-10 opacity-80 flex items-center justify-center">
        <MyLottie />
      </div>

      <div className="w-full md:w-1/3 md:h-full p-4 pb-8 md:p-4 border-2 border-background rounded-3xl text-background bg-primary custom-shadow  flex flex-col justify-center gap-6 md:gap-12 relative">
        <p className="md:absolute top-12 text-xl opacity-50 sora -rotate-0">
          #WatuWaoane
        </p>

        <h2 className="font-bold">
          Matchmaking by <span className="opacity-70">Fred</span>
        </h2>

        <p className="opacity-80">
          As part of the{' '}
          <span className="font-bold underline">#WatuWaoane</span> campaign,
          I&apos;m glad to help you find a potential partner through this
          platform. Please provide your details exactly as you would like them
          to appear on the profile that I will put out. <br /> <br /> To have
          your profile featured on our Facebook page and WhatsApp match-making
          channel, kindly ensure you have paid the Ksh 300 service fee to{' '}
          <span className="font-bold underline text-nowrap">0726 656 314</span>{' '}
          (John Muitiriri)
        </p>
      </div>

      <div className="w-full md:w-2/3 md:h-full flex flex-col items-center justify-center gap-12">
        <h1 className="font-bold opacity-70 text-center">let&apos;s build your profile</h1>
        <Form />
      </div>
    </section>
  )
}

export default Landing
