import { useEffect, useState } from "react";
import { getMahasiswa } from "../services/api";

export default function Mahasiswa() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [keyword, setKeyword] = useState("");

  const fetchData = () => {
    setLoading(true);
    getMahasiswa()
      .then(setMahasiswa)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  // pertama kali load
  useEffect(() => {
    fetchData();
  }, []);
  
  if (loading) return <p className="text-center">Loading...</p>;

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const filteredMahasiswa = mahasiswa.filter((mhs) => {
  const key = keyword.toLowerCase();

  return (
    mhs.nama.toLowerCase().includes(key) ||
    mhs.prodi.toLowerCase().includes(key) ||
    mhs.email?.toLowerCase().includes(key) ||
    mhs.alamat?.toLowerCase().includes(key) ||
    String(mhs.npm).includes(key)
    );
  });

  return (
    <div className="max-w-8xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Daftar Mahasiswa</h2>
      <div className="flex items-center justify-between mb-4 gap-4">
        {/* Input */}
        <input
          type="text"
          placeholder="Cari nama, prodi, email, alamat, atau NPM..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-1/2 p-2 border rounded"
        />

        {/* Refresh */}
        <button
          nClick={fetchData}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Refresh Data
        </button>
      </div>
      
      <p className="mb-4 text-sm text-gray-500">
        Total Mahasiswa: <span className="font-semibold">{mahasiswa.length}</span>
        </p>

      <div className="overflow-hidden border rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-300 border-b text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border">No</th>
              <th className="px-4 py-3 border">NPM</th>
              <th className="px-4 py-3 border">Nama / Prodi</th>
              <th className="px-4 py-3 border">Email</th>
              <th className="px-4 py-3 border">Alamat</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredMahasiswa.map((mhs, index) => (
              <tr key={mhs.npm} className="hover:bg-blue-50">
                <td className="px-4 py-3 border">{index + 1}</td>
                <td className="px-4 py-3 border">{mhs.npm}</td>
                <td className="px-4 py-3 border">
                  <div className="font-medium">{mhs.nama}</div>
                  <div className="text-gray-500 text-xs">{mhs.prodi}</div>
                </td>
                <td className="px-4 py-3 text-gray-600 border">{mhs.email}</td>
                <td className="px-4 py-3 text-gray-500 border">{mhs.alamat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}