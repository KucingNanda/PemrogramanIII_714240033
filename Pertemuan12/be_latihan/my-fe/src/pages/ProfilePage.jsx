import { getUser } from "../services/auth";
import PageTitle from "../components/molecules/PageTitle";

export default function ProfilePage() {
  const user = getUser();

  return (
    <div className="space-y-5">
      <PageTitle
        title="Profil Pengguna"
        description="Informasi akun Anda yang sedang aktif."
      />

      <div className="max-w-md overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        <div className="relative px-6 pb-6 pt-12">
          <div className="absolute -top-12 left-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-slate-100 text-4xl shadow-md">
            👤
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            {user?.username || "Tamu"}
          </h2>
          <p className="mt-1 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
            {user?.role || "TIDAK DIKETAHUI"}
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-500">Username</p>
              <p className="font-semibold text-slate-800">{user?.username || "-"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">ID User</p>
              <p className="font-mono text-xs text-slate-800 break-all">{user?.id || "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
