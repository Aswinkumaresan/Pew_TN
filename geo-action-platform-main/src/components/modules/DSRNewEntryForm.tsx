import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  district: z.string().min(1, "Required"),
  unit: z.string().min(1, "Required"),
  checkpost: z.string().optional(),
  offenceType: z.string().min(1, "Required"),
  contrabandType: z.string().min(1, "Required"),
  quantity: z.string().min(1, "Required"),
  accusedName: z.string().min(2, "Required"),
  vehicleInfo: z.string().optional(),
  gpsLat: z.string().optional(),
  gpsLng: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const districts = [
  "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem",
  "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Dindigul",
  "Thanjavur", "Ranipet", "Sivaganga", "Karur", "Namakkal",
];

const offenceTypes = ["NDPS", "CRIME", "PEW"];
const contrabandTypes = ["Cannabis / Ganja", "Heroin", "MDMA / Ecstasy", "Cocaine", "Methamphetamine", "Psychotropic Pills", "Arrack / IMFL", "Counterfeit Goods", "Tobacco Products"];

interface Props {
  onClose: () => void;
}

export function DSRNewEntryForm({ onClose }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("New DSR Entry:", data);
    onClose();
  };

  const fieldClass = "w-full rounded-lg border px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring";
  const labelClass = "text-sm font-semibold text-foreground block mb-1.5";
  const errorClass = "text-xs mt-1 text-destructive";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-2">
      <div className="grid grid-cols-2 gap-5">
        {/* District */}
        <div>
          <label className={labelClass}>District</label>
          <select {...register("district")} className={fieldClass} style={{ borderColor: errors.district ? "hsl(var(--destructive))" : "hsl(var(--border))" }}>
            <option value="">Select district</option>
            {districts.map(d => <option key={d}>{d}</option>)}
          </select>
          {errors.district && <p className={errorClass}>{errors.district.message}</p>}
        </div>

        {/* Unit */}
        <div>
          <label className={labelClass}>Unit</label>
          <input {...register("unit")} className={fieldClass} style={{ borderColor: errors.unit ? "hsl(var(--destructive))" : "hsl(var(--border))" }} placeholder="Enter unit name" />
          {errors.unit && <p className={errorClass}>{errors.unit.message}</p>}
        </div>

        {/* Checkpost */}
        <div>
          <label className={labelClass}>Checkpost</label>
          <input {...register("checkpost")} className={fieldClass} style={{ borderColor: "hsl(var(--border))" }} placeholder="Enter checkpost" />
        </div>

        {/* Offence Type */}
        <div>
          <label className={labelClass}>Offence Type</label>
          <select {...register("offenceType")} className={fieldClass} style={{ borderColor: errors.offenceType ? "hsl(var(--destructive))" : "hsl(var(--border))" }}>
            <option value="">Select offence type</option>
            {offenceTypes.map(t => <option key={t}>{t}</option>)}
          </select>
          {errors.offenceType && <p className={errorClass}>{errors.offenceType.message}</p>}
        </div>

        {/* Contraband Type */}
        <div>
          <label className={labelClass}>Contraband Type</label>
          <select {...register("contrabandType")} className={fieldClass} style={{ borderColor: errors.contrabandType ? "hsl(var(--destructive))" : "hsl(var(--border))" }}>
            <option value="">Select type</option>
            {contrabandTypes.map(t => <option key={t}>{t}</option>)}
          </select>
          {errors.contrabandType && <p className={errorClass}>{errors.contrabandType.message}</p>}
        </div>

        {/* Quantity */}
        <div>
          <label className={labelClass}>Quantity</label>
          <input {...register("quantity")} className={fieldClass} style={{ borderColor: errors.quantity ? "hsl(var(--destructive))" : "hsl(var(--border))" }} placeholder="e.g. 5 kg" />
          {errors.quantity && <p className={errorClass}>{errors.quantity.message}</p>}
        </div>

        {/* Accused Name */}
        <div>
          <label className={labelClass}>Accused Name</label>
          <input {...register("accusedName")} className={fieldClass} style={{ borderColor: errors.accusedName ? "hsl(var(--destructive))" : "hsl(var(--border))" }} placeholder="Enter accused name" />
          {errors.accusedName && <p className={errorClass}>{errors.accusedName.message}</p>}
        </div>

        {/* Vehicle Info */}
        <div>
          <label className={labelClass}>Vehicle Info</label>
          <input {...register("vehicleInfo")} className={fieldClass} style={{ borderColor: "hsl(var(--border))" }} placeholder="Vehicle number / type" />
        </div>

        {/* GPS Lat */}
        <div>
          <label className={labelClass}>GPS Latitude</label>
          <input {...register("gpsLat")} className={fieldClass} style={{ borderColor: "hsl(var(--border))" }} placeholder="e.g. 26.9124" />
        </div>

        {/* GPS Lng */}
        <div>
          <label className={labelClass}>GPS Longitude</label>
          <input {...register("gpsLng")} className={fieldClass} style={{ borderColor: "hsl(var(--border))" }} placeholder="e.g. 75.7873" />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className={labelClass}>Notes</label>
        <textarea {...register("notes")} rows={3} className={`${fieldClass} resize-none`} style={{ borderColor: "hsl(var(--border))" }} placeholder="Additional notes..." />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors hover:bg-muted" style={{ borderColor: "hsl(var(--border))" }}>
          Cancel
        </button>
        <button type="submit" className="px-6 py-2.5 rounded-lg text-sm font-semibold" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
          Submit Entry
        </button>
      </div>
    </form>
  );
}
