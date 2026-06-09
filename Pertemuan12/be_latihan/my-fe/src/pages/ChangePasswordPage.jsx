import { useState } from "react";
import Swal from "sweetalert2";
import Button from "../components/atoms/Button";
import TextInput from "../components/atoms/TextInput";
import FormField from "../components/molecules/FormField";
import PageTitle from "../components/molecules/PageTitle";
import { changePassword } from "../services/auth";

export default function ChangePasswordPage() {
  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.new_password !== form.confirm_password) {
      return Swal.fire("Gagal", "Konfirmasi password baru tidak cocok.", "error");
    }

    try {
      setLoading(true);
      await changePassword({
        old_password: form.old_password,
        new_password: form.new_password,
      });

      await Swal.fire("Berhasil", "Password Anda berhasil diperbarui.", "success");
      setForm({ old_password: "", new_password: "", confirm_password: "" });
    } catch (error) {
      Swal.fire(
        "Gagal",
        error.response?.data?.message || "Gagal mengubah password.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <PageTitle
        title="Ganti Password"
        description="Perbarui kata sandi akun Anda untuk menjaga keamanan."
      />

      <div className="max-w-md rounded-xl border bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Password Lama" htmlFor="old_password">
            <TextInput
              id="old_password"
              name="old_password"
              type="password"
              value={form.old_password}
              onChange={handleChange}
              required
            />
          </FormField>

          <FormField label="Password Baru" htmlFor="new_password">
            <TextInput
              id="new_password"
              name="new_password"
              type="password"
              value={form.new_password}
              onChange={handleChange}
              required
            />
          </FormField>

          <FormField label="Konfirmasi Password Baru" htmlFor="confirm_password">
            <TextInput
              id="confirm_password"
              name="confirm_password"
              type="password"
              value={form.confirm_password}
              onChange={handleChange}
              required
            />
          </FormField>

          <div className="pt-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
