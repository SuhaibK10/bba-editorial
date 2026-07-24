// Static promo bar, sits just above the Best Sellers carousel. Solid
// brick-red announcement-bar treatment, uppercase/tracked like the
// louispolo.in reference, rather than a soft tinted aside.
export default function PromoStrip() {
  return (
    <div className="bg-[#7c3a3a] overflow-x-auto">
      <div className="container-wide py-2.5 md:py-3">
        <p className="font-body text-[10px] sm:text-xs md:text-sm lg:text-base uppercase tracking-wide sm:tracking-widest text-white/90 text-center whitespace-nowrap">
          Extra 10% off for first-time buyers <span className="mx-1.5 text-white/50">·</span> Use code FTB10
        </p>
      </div>
    </div>
  );
}
