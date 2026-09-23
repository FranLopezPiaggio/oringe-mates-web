import Image from 'next/image';

export default function BrandManifesto() {
  return (
    <section
      id="manifiesto"
      className="w-full py-space-3xl max-w-[1380px] mx-auto px-margin md:px-margin-desktop"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
        {/* Columna Izquierda: Imagen del taller / manos artesanas */}
        <div className="lg:col-span-6 relative">
          <div className="w-full aspect-[4/5] border border-outline-variant bg-surface-container-low overflow-hidden relative">
            <Image
              src="/mate.jpg"
              alt="An artisan potter's weathered hands gently shaping wet red clay on a traditional manual pottery wheel"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -right-6 hidden sm:block bg-surface-container border border-outline-variant p-6 max-w-xs z-10">
            <p className="font-label-uppercase text-[10px] text-secondary tracking-widest uppercase mb-1">
              Filosofía de Origen
            </p>
            <p className="font-title-editorial text-body-sm text-on-surface italic">
              &quot;Cada pieza requiere tres semanas entre secado lento y horneado a leña.&quot;
            </p>
          </div>
        </div>

        {/* Columna Derecha: Cita destacada e Historia */}
        <div className="lg:col-span-6 mt-10 lg:mt-0 lg:pl-6 space-y-6">
          <span className="font-label-uppercase text-label-uppercase text-secondary tracking-[0.2em] uppercase block">
            Manifiesto Atelier
          </span>

          <blockquote className="font-title-editorial text-headline-sm md:text-headline-md text-primary leading-snug italic">
            “Creemos en la pausa, en la materia noble y en la huella irrepetible de lo hecho a mano.”
          </blockquote>

          <div className="space-y-4 font-body-md text-on-surface-variant leading-relaxed">
            <p>
              Morelia nació en 2018 entre las sierras y el rumor del taller. Comenzamos como un refugio botánico y alfarero para rescatar técnicas ancestrales de cocción lenta y extracción vegetal libre de aditivos sintéticos.
            </p>
            <p>
              Diseñamos objetos utilitarios que celebran la imperfección orgánica: la línea asimétrica del gres, la caricia áspera del lino lavado y aromas botánicos destilados de plantas autóctonas.
            </p>
          </div>

          <div className="pt-4 border-t border-outline-variant flex items-center justify-between">
            <div>
              <p className="font-title-editorial text-body-lg text-primary">
                Clara &amp; Mateo Morel
              </p>
              <p className="font-label-uppercase text-[10px] text-outline uppercase tracking-wider">
                Fundadores &amp; Maestros Artesanos
              </p>
            </div>
            <span className="material-symbols-outlined text-secondary text-3xl">
              spa
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}