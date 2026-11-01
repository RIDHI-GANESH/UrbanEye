
import { useState } from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Bell,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Clock3,
  ClipboardList,
  Filter,
  LayoutDashboard,
  Map,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

type Issue = {
  id: string
  title: string
  location: string
  category: string
  priority: 'Critical' | 'High' | 'Medium'
  status: string
  lat: number
  lng: number
  age: string
}

const issues: Issue[] = [
  {
    id: 'UE-1024',
    title: 'Major pothole detected',
    location: 'Jayanagar 4th Block',
    category: 'Road damage',
    priority: 'Critical',
    status: 'Unassigned',
    lat: 12.925,
    lng: 77.583,
    age: '12 min ago',
  },
  {
    id: 'UE-1023',
    title: 'Garbage accumulation',
    location: 'Basavanagudi',
    category: 'Waste',
    priority: 'High',
    status: 'In progress',
    lat: 12.942,
    lng: 77.568,
    age: '38 min ago',
  },
  {
    id: 'UE-1022',
    title: 'Waterlogging reported',
    location: 'Lalbagh Road',
    category: 'Waterlogging',
    priority: 'High',
    status: 'Under review',
    lat: 12.951,
    lng: 77.597,
    age: '1 hour ago',
  },
  {
    id: 'UE-1021',
    title: 'Road surface damage',
    location: 'V V Puram',
    category: 'Road damage',
    priority: 'Medium',
    status: 'Resolved',
    lat: 12.955,
    lng: 77.574,
    age: '2 hours ago',
  },
]

const navigation = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Live Map', icon: Map },
  { label: 'Complaints', icon: ClipboardList },
  { label: 'AI Intelligence', icon: BrainCircuit },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Field Operations', icon: Truck },
]

function App() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [selectedIssue, setSelectedIssue] = useState('UE-1024')

  const selected = issues.find((issue) => issue.id === selectedIssue)

  return (
    <div className="min-h-screen bg-[#f5f7f8] text-slate-800">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col bg-[#102d2a] text-white lg:flex">
          <div className="flex items-center gap-3 px-6 py-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-[#102d2a]">
              <Activity size={23} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">UrbanEye</h1>
              <p className="text-xs text-emerald-100/60">SMART CITY INTELLIGENCE</p>
            </div>
          </div>

          <div className="px-4 pt-5">
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-100/40">
              Workspace
            </p>
            <nav className="space-y-1">
              {navigation.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => setActiveNav(label)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                    activeNav === label
                      ? 'bg-emerald-400 font-semibold text-[#102d2a]'
                      : 'text-emerald-50/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {label}
                  {label === 'Complaints' && (
                    <span className="ml-auto rounded-full bg-red-400 px-2 py-0.5 text-[10px] font-bold text-white">
                      12
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 flex items-center gap-2 text-emerald-300">
                <ShieldCheck size={18} />
                <span className="text-xs font-semibold">System status</span>
              </div>
              <p className="text-sm font-medium">All systems operational</p>
              <p className="mt-1 text-xs text-emerald-100/50">
                Demo environment
              </p>
              <div className="mt-4 h-1.5 rounded-full bg-white/10">
                <div className="h-1.5 w-[92%] rounded-full bg-emerald-400" />
              </div>
            </div>
            <button
              onClick={() => setActiveNav('Settings')}
              className="mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-emerald-50/70 hover:bg-white/10"
            >
              <Settings size={18} />
              Settings
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white px-5 md:px-8">
            <div>
              <p className="text-xs text-slate-400">UrbanEye / Administrator</p>
              <h2 className="text-lg font-bold text-slate-800">
                {activeNav === 'Overview' ? 'Operations overview' : activeNav}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-400 sm:flex">
                <Search size={15} />
                Search anything...
                <span className="rounded border border-slate-200 px-1.5 py-0.5">⌘ K</span>
              </div>
              <button className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50">
                <Bell size={18} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </button>
              <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">
                  A
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-semibold">Administrator</p>
                  <p className="text-[10px] text-slate-400">Municipal authority</p>
                </div>
                <ChevronDown size={15} className="text-slate-400" />
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1600px] space-y-6 p-5 md:p-8">
            <section className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">
                  Here's what's happening across your city.
                </p>
                <h3 className="mt-1 text-2xl font-bold tracking-tight">
                  City at a glance <span className="text-emerald-600">.</span>
                </h3>
              </div>
              <button className="flex items-center gap-2 rounded-xl bg-[#123b35] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1b5148]">
                <Plus size={17} />
                New report
              </button>
            </section>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Total complaints"
                value="1,284"
                change="+12.8%"
                note="vs. last month"
                icon={ClipboardList}
                iconBg="bg-blue-50 text-blue-600"
              />
              <StatCard
                label="Needs attention"
                value="86"
                change="18 critical"
                note="Requires action"
                icon={AlertTriangle}
                iconBg="bg-rose-50 text-rose-600"
              />
              <StatCard
                label="Resolved issues"
                value="942"
                change="+8.4%"
                note="vs. last month"
                icon={CheckCircle2}
                iconBg="bg-emerald-50 text-emerald-600"
              />
              <StatCard
                label="Average response"
                value="4.2 hrs"
                change="-16.2%"
                note="Improved response time"
                icon={Clock3}
                iconBg="bg-violet-50 text-violet-600"
              />
            </section>

            <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.65fr_1fr]">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
                  <div>
                    <h3 className="font-bold">City infrastructure map</h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Reported issues · Bengaluru demo area
                    </p>
                  </div>
                  <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600">
                    <Filter size={14} />
                    Filters
                  </button>
                </div>

                <div className="relative h-[360px] w-full">
                  <MapContainer
                    center={[12.941, 77.583]}
                    zoom={13}
                    scrollWheelZoom={true}
                    className="h-full w-full"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {issues.map((issue) => (
                      <CircleMarker
                        key={issue.id}
                        center={[issue.lat, issue.lng]}
                        radius={selectedIssue === issue.id ? 11 : 8}
                        pathOptions={{
                          color: '#ffffff',
                          weight: 2,
                          fillColor:
                            issue.priority === 'Critical'
                              ? '#e5484d'
                              : issue.priority === 'High'
                                ? '#f59e0b'
                                : '#10b981',
                          fillOpacity: 0.95,
                        }}
                        eventHandlers={{
                          click: () => setSelectedIssue(issue.id),
                        }}
                      >
                        <Popup>
                          <strong>{issue.title}</strong>
                          <br />
                          {issue.location}
                          <br />
                          {issue.id}
                        </Popup>
                      </CircleMarker>
                    ))}
                  </MapContainer>
                  <div className="absolute bottom-4 left-4 z-[1000] rounded-xl border border-slate-200 bg-white/95 p-3 shadow-md">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Issue priority
                    </p>
                    <Legend color="#e5484d" label="Critical" />
                    <Legend color="#f59e0b" label="High" />
                    <Legend color="#10b981" label="Medium" />
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-5 py-3">
                  <p className="text-xs text-slate-400">
                    <MapPin size={13} className="mr-1 inline" />
                    Sample issue coordinates
                  </p>
                  <p className="text-xs font-medium text-emerald-700">
                    {issues.length} demo markers displayed
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">Priority issues</h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Issues requiring attention
                    </p>
                  </div>
                  <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-50">
                    <MoreHorizontal size={19} />
                  </button>
                </div>

                <div className="mt-5 space-y-3">
                  {issues.map((issue) => (
                    <button
                      key={issue.id}
                      onClick={() => setSelectedIssue(issue.id)}
                      className={`w-full rounded-xl border p-3 text-left transition ${
                        selectedIssue === issue.id
                          ? 'border-emerald-300 bg-emerald-50/60'
                          : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {issue.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {issue.location}
                          </p>
                        </div>
                        <PriorityTag priority={issue.priority} />
                      </div>
                      <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400">
                        <span>{issue.id}</span>
                        <span>{issue.age}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50">
                  View all complaints <ArrowUpRight size={14} />
                </button>
              </div>
            </section>

            <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold">Selected issue details</h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Select an issue from the map or list
                    </p>
                  </div>
                  <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500">
                    {selected?.id ?? 'No selection'}
                  </span>
                </div>
                {selected && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <Detail label="Issue" value={selected.title} />
                    <Detail label="Category" value={selected.category} />
                    <Detail label="Location" value={selected.location} />
                    <Detail label="Reported" value={selected.age} />
                    <Detail label="Priority" value={selected.priority} />
                    <Detail label="Current status" value={selected.status} />
                  </div>
                )}
                <div className="mt-5 flex flex-wrap gap-2">
                  <button className="rounded-lg bg-[#123b35] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#1b5148]">
                    Assign field worker
                  </button>
                  <button className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                    View report
                  </button>
                </div>
              </div>

              <div className="rounded-2xl bg-[#123b35] p-5 text-white shadow-sm">
                <div className="flex items-center gap-2 text-emerald-300">
                  <BrainCircuit size={19} />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    UrbanEye intelligence
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold">
                  Smarter decisions. Safer streets.
                </h3>
                <p className="mt-2 text-sm leading-6 text-emerald-50/65">
                  AI-powered infrastructure monitoring and predictive insights
                  will help administrators identify issues and prioritise
                  response.
                </p>
                <div className="mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
                  <div>
                    <p className="text-xs text-emerald-100/50">Intelligence engine</p>
                    <p className="mt-1 text-sm font-semibold">Integration pending</p>
                  </div>
                  <div className="rounded-full bg-amber-400/15 px-3 py-1.5 text-[10px] font-semibold text-amber-300">
                    In development
                  </div>
                </div>
              </div>
            </section>

            <footer className="pb-3 text-center text-xs text-slate-400">
              UrbanEye · AI-Powered Urban Infrastructure Intelligence
              <span className="mx-2">·</span>
              Prototype dashboard · Sample data
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  change,
  note,
  icon: Icon,
  iconBg,
}: {
  label: string
  value: string
  change: string
  note: string
  icon: React.ElementType
  iconBg: string
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <div className={`rounded-xl p-2.5 ${iconBg}`}>
          <Icon size={19} />
        </div>
      </div>
      <p className="mt-4 text-3xl font-bold tracking-tight">{value}</p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-emerald-600">{change}</span>
        <span className="text-xs text-slate-400">{note}</span>
      </div>
    </div>
  )
}

function PriorityTag({ priority }: { priority: Issue['priority'] }) {
  const styles = {
    Critical: 'bg-rose-50 text-rose-600',
    High: 'bg-amber-50 text-amber-700',
    Medium: 'bg-emerald-50 text-emerald-700',
  }

  return (
    <span className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-bold ${styles[priority]}`}>
      {priority}
    </span>
  )
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="mb-1 flex items-center gap-2 text-[10px] text-slate-600">
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-700">{value}</p>
    </div>
  )
}

export default App
