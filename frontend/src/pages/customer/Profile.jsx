import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Pencil,
  Save,
  X,
} from "lucide-react";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/customers/profile");

      setProfile({
        name: res.data.name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        address: res.data.address || "",
      });
    } catch (err) {
      console.log(err);
      alert("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await api.put("/customers/profile", {
        name: profile.name,
        phone: profile.phone,
        address: profile.address,
      });

      alert("Profile updated successfully!");

      setEditing(false);
    } catch (err) {
      console.log(err);
      alert("Unable to update profile.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-lg font-semibold text-slate-600">
          Loading Profile...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">

      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">

        {/* Header */}

        <div className="px-10 py-8 border-b bg-slate-50">

          <div className="flex items-center gap-5">

            <div className="h-20 w-20 rounded-full bg-indigo-600 flex items-center justify-center shadow">

              <User className="text-white" size={38} />

            </div>

            <div>

              <h2 className="text-3xl font-bold text-slate-900">
                {profile.name}
              </h2>

              <p className="text-slate-500 mt-1">
                Customer Account
              </p>

            </div>

          </div>

        </div>

        {/* Body */}

        <div className="p-10">

          <div className="grid md:grid-cols-2 gap-8">

            {/* Full Name */}

            <div>

              <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">

                <User size={16} />

                Full Name

              </label>

              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!editing}
                className={`w-full rounded-xl border px-4 py-3 transition ${
                  editing
                    ? "border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none"
                    : "bg-slate-100 border-slate-200"
                }`}
              />

            </div>

            {/* Email */}

            <div>

              <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">

                <Mail size={16} />

                Email

              </label>

              <input
                value={profile.email}
                disabled
                className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500"
              />

            </div>

            {/* Phone */}

            <div>

              <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">

                <Phone size={16} />

                Phone

              </label>

              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!editing}
                className={`w-full rounded-xl border px-4 py-3 transition ${
                  editing
                    ? "border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none"
                    : "bg-slate-100 border-slate-200"
                }`}
              />

            </div>

            {/* Address */}

            <div className="md:col-span-2">

              <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">

                <MapPin size={16} />

                Address

              </label>

              <textarea
                rows="4"
                name="address"
                value={profile.address}
                onChange={handleChange}
                disabled={!editing}
                className={`w-full rounded-xl border px-4 py-3 transition resize-none ${
                  editing
                    ? "border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none"
                    : "bg-slate-100 border-slate-200"
                }`}
              />

            </div>

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4 mt-10">

            {!editing ? (

              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              >

                <Pencil size={18} />

                Edit Profile

              </button>

            ) : (

              <>
                <button
                  onClick={() => {
                    setEditing(false);
                    fetchProfile();
                  }}
                  className="flex items-center gap-2 border border-slate-300 hover:bg-slate-100 px-6 py-3 rounded-xl font-semibold transition"
                >

                  <X size={18} />

                  Cancel

                </button>

                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >

                  <Save size={18} />

                  Save Changes

                </button>
              </>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;