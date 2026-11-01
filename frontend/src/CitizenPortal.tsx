
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  ChevronDown,
  MapPin,
  Navigation,
  Upload,
  X,
} from 'lucide-react'

const categories = [
  { name: 'Pothole / Road damage', emoji: '🛣️' },
  { name: 'Garbage accumulation', emoji: '🗑️' },
  { name: 'Waterlogging', emoji: '💧' },
]

function CitizenPortal() {
  const [category, setCategory] = useState(categories[0].name)
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#f5f8f6] text-slate-800">
      <header className="border-b border-emerald-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dff3e9] text-emerald-800">
              <Navigation size={21} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#174c3b]">
                UrbanEye
              </h1>
              <p className="text-[10px] font-medium tracking-wider text-slate-400">
                CITIZEN CONNECT
              </p>
            </div>
          </div>
          <span className="hidden rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 sm:block">
            Your city. Your voice.
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">
        <button
          onClick={() => setSubmitted(false)}
          className="mb-7 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-700"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {submitted ? (
          <div className="mx-auto max-w-xl rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 size={34} />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-[#174c3b]">
              Report submitted!
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Thank you for helping make your city better. This is a local
              prototype confirmation; your report has not yet been saved to a
              server.
            </p>
            <div className="mt-7 rounded-2xl bg-emerald-50 p-4 text-left">
              <p className="text-xs font-semibold text-emerald-800">
                REPORT SUMMARY
              </p>
              <p className="mt-3 text-sm font-semibold">{category}</p>
              <p className="mt-1 text-sm text-slate-500">
                {location || 'Location not provided'}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                {description || 'No additional description'}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                {photo ? `Photo: ${photo.name}` : 'No photo attached'}
              </p>
            </div>
            <button
              onClick={() => {
                setSubmitted(false)
                setCategory(categories[0].name)
                setLocation('')
                setDescription('')
                setPhoto(null)
              }}
              className="mt-7 rounded-xl bg-[#174c3b] px-6 py-3 text-sm font-semibold text-white hover:bg-[#23644d]"
            >
              Submit another report
            </button>
          </div>
        ) : (
          <>
            <div className="mb-9">
              <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-800">
                COMMUNITY REPORTING
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#174c3b] sm:text-4xl">
                Help us build a
                <br />
                <span className="text-emerald-600">better city.</span>
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                Spotted a pothole, overflowing garbage or waterlogging?
                Report it here. Your contribution helps municipal teams
                identify problems and take action.
              </p>
            </div>

            <div className="grid gap-7 lg:grid-cols-[1.2fr_0.8fr]">
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="mb-7 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">Report an issue</h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Tell us what needs attention.
                    </p>
                  </div>
                  <span className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                    New report
                  </span>
                </div>

                <label className="mb-3 block text-sm font-semibold">
                  01. What is the issue?
                </label>
                <div className="mb-7 grid gap-3 sm:grid-cols-3">
                  {categories.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setCategory(item.name)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        category === item.name
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <p className="mt-3 text-xs font-semibold leading-5">
                        {item.name}
                      </p>
                      {category === item.name && (
                        <CheckCircle2
                          size={16}
                          className="mt-2 text-emerald-600"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <label className="mb-2 block text-sm font-semibold">
                  02. Where is it located?
                </label>
                <div className="mb-7 flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 focus-within:border-emerald-500">
                  <MapPin size={18} className="shrink-0 text-emerald-600" />
                  <input
                    required
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="Enter area, street or landmark"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    title="Location detection will be integrated later"
                    className="shrink-0 text-xs font-semibold text-emerald-700"
                  >
                    Locate
                  </button>
                </div>

                <label className="mb-2 block text-sm font-semibold">
                  03. Upload a photograph
                </label>
                <label className="mb-7 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/40 px-5 py-7 text-center transition hover:bg-emerald-50">
                  <Upload size={25} className="text-emerald-600" />
                  <p className="mt-3 text-sm font-semibold">
                    {photo ? photo.name : 'Click to upload an image'}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    PNG, JPG or JPEG
                  </p>
                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    className="hidden"
                    onChange={(event) =>
                      setPhoto(event.target.files?.[0] ?? null)
                    }
                  />
                </label>

                {photo && (
                  <button
                    type="button"
                    onClick={() => setPhoto(null)}
                    className="mb-5 flex items-center gap-2 text-xs text-rose-600"
                  >
                    <X size={14} /> Remove photo
                  </button>
                )}

                <label className="mb-2 block text-sm font-semibold">
                  04. Describe the problem
                </label>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={4}
                  placeholder="Tell us a little more about the issue..."
                  className="mb-7 w-full resize-none rounded-xl border border-slate-200 p-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500"
                />

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#174c3b] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#23644d]"
                >
                  Submit report <ArrowRight size={17} />
                </button>
                <p className="mt-3 text-center text-[10px] text-slate-400">
                  Prototype only · Reports are not yet sent to a server
                </p>
              </form>

              <div className="space-y-5">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <div className="p-5">
                    <h3 className="font-bold">Your neighbourhood matters</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Every report helps identify infrastructure problems.
                    </p>
                  </div>
                  <div className="flex h-48 items-center justify-center bg-[#e9f3ed]">
                    <div className="text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
                        <MapPin size={27} />
                      </div>
                      <p className="mt-3 text-sm font-semibold text-[#174c3b]">
                        Location map coming soon
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Interactive reporting map
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl bg-[#174c3b] p-6 text-white">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <Camera size={19} />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Reporting tip
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold">
                    A picture makes a difference.
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-emerald-50/70">
                    Upload a clear photograph of the problem. It can help
                    municipal teams understand and assess the issue.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-white p-5">
                  <p className="text-sm font-bold text-[#174c3b]">
                    How it works
                  </p>
                  <div className="mt-4 space-y-4">
                    {[
                      'Report an infrastructure issue',
                      'Municipal team reviews the report',
                      'A field worker is assigned',
                      'Repair progress is tracked',
                    ].map((step, index) => (
                      <div key={step} className="flex items-center gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                          {index + 1}
                        </span>
                        <p className="text-xs text-slate-600">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-emerald-100 bg-white px-5 py-6 text-center text-xs text-slate-400">
        UrbanEye · Your city. Your voice.
      </footer>
    </div>
  )
}

export default CitizenPortal