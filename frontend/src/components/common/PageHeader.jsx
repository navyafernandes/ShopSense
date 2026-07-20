function PageHeader({ title, subtitle, children }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          {title}
        </h1>

        <p className="text-slate-500 mt-1">
          {subtitle}
        </p>
      </div>

      {children}
    </div>
  );
}

export default PageHeader;