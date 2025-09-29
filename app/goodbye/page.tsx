export default function Goodbye() {
  return (
    <main className="px-4 md:px-8 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">Goodbye</h1>
      <p className="text-zinc-400 mb-6">Thanks for visiting! Feel free to reach out or grab my CV below.</p>
      <div className="flex gap-3">
        <a className="px-4 py-2 rounded-md bg-zinc-900 border border-zinc-800" href="/resume.pdf">Download CV</a>
        <a className="px-4 py-2 rounded-md bg-zinc-900 border border-zinc-800" href="https://github.com/7sg56" target="_blank">GitHub</a>
        <a className="px-4 py-2 rounded-md bg-zinc-900 border border-zinc-800" href="https://x.com/7sg56" target="_blank">X/Twitter</a>
      </div>
    </main>
  );
}
