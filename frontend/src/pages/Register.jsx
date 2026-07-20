import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Phone,
  Store,
  Building2,
  BadgeCheck,
} from "lucide-react";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    role: "CUSTOMER",
    business_name: "",
    business_type: "",
    gst_number: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    try {
      await api.post("/auth/register", form);

      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Registration failed."
      );
    }
  };

  const InputField = ({
    icon,
    name,
    type = "text",
    placeholder,
  }) => (
    <div>
      <div className="relative">

        <span className="absolute left-4 top-4 text-slate-400">
          {icon}
        </span>

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={form[name]}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3.5 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
        />

      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center p-8">

      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-2xl p-10">

        <h1 className="text-4xl font-bold text-slate-900">
          Create Account
        </h1>

        <p className="text-slate-500 mt-2 mb-8">
          Join ShopSense Marketplace
        </p>

        {error && (
          <div className="mb-5 rounded-xl bg-red-50 border border-red-200 text-red-600 p-4">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-xl bg-green-50 border border-green-200 text-green-700 p-4">
            {success}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5">

          <InputField
            icon={<User size={18} />}
            name="full_name"
            placeholder="Full Name"
          />

          <InputField
            icon={<Mail size={18} />}
            name="email"
            type="email"
            placeholder="Email"
          />

          <InputField
            icon={<Lock size={18} />}
            name="password"
            type="password"
            placeholder="Password"
          />

          <InputField
            icon={<Phone size={18} />}
            name="phone"
            placeholder="Phone"
          />

        </div>

        <div className="mt-8">

          <h3 className="font-semibold text-slate-700 mb-4">
            Select Role
          </h3>

          <div className="grid grid-cols-2 gap-4">

            <button
              onClick={() =>
                setForm({
                  ...form,
                  role: "CUSTOMER",
                })
              }
              className={`rounded-2xl border p-5 transition ${
                form.role === "CUSTOMER"
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-slate-200"
              }`}
            >
              👤
              <h4 className="font-bold mt-2">
                Customer
              </h4>
            </button>

            <button
              onClick={() =>
                setForm({
                  ...form,
                  role: "VENDOR",
                })
              }
              className={`rounded-2xl border p-5 transition ${
                form.role === "VENDOR"
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-slate-200"
              }`}
            >
              🏪
              <h4 className="font-bold mt-2">
                Vendor
              </h4>
            </button>

          </div>

        </div>

        {form.role === "VENDOR" && (

          <div className="grid md:grid-cols-2 gap-5 mt-8">

            <InputField
              icon={<Store size={18} />}
              name="business_name"
              placeholder="Business Name"
            />

            <InputField
              icon={<Building2 size={18} />}
              name="business_type"
              placeholder="Business Type"
            />

            <div className="md:col-span-2">

              <InputField
                icon={<BadgeCheck size={18} />}
                name="gst_number"
                placeholder="GST Number"
              />

            </div>

          </div>

        )}

        <button
          onClick={handleRegister}
          className="mt-10 w-full rounded-xl bg-slate-900 py-3.5 text-white font-semibold hover:bg-slate-800 transition"
        >
          Create Account
        </button>

        <p className="text-center mt-8 text-slate-600">

          Already have an account?

          <Link
            to="/"
            className="ml-2 text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;