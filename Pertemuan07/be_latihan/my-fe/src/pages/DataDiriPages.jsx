export default function DataDiriPage() {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold">Data Diri</h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
          👤
        </div>
        
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border bg-slate-50 p-4">
              <p className="text-xs text-slate-500 uppercase font-semibold">Nama Lengkap</p>
              <p className="mt-1 text-lg font-medium text-slate-800">Nanda Septiana Ramadhani</p>
            </div>
            
            <div className="rounded-lg border bg-slate-50 p-4">
              <p className="text-xs text-slate-500 uppercase font-semibold">NPM</p>
              <p className="mt-1 text-lg font-medium text-slate-800">714240033</p>
            </div>
            
            <div className="rounded-lg border bg-slate-50 p-4">
              <p className="text-xs text-slate-500 uppercase font-semibold">Program Studi</p>
              <p className="mt-1 text-lg font-medium text-slate-800">D4 Teknik Informatika</p>
            </div>
            
            <div className="rounded-lg border bg-slate-50 p-4">
              <p className="text-xs text-slate-500 uppercase font-semibold">Kelas</p>
              <p className="mt-1 text-lg font-medium text-slate-800">D4 TI 2C</p>
            </div>
          </div>
          
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm text-blue-800 font-medium">
              Halaman statis yang ditambahkan sebagai tugas latihan mandiri untuk memahami konsep layout dan navigasi di React.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
