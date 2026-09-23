'use client';

import { MailIcon } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function ContactForm() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulación de envío a API/Backend
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <section className="w-full bg-surface-container-low border-t border-outline-variant py-space-3xl">
      <div className="max-w-2xl mx-auto px-margin flex flex-col text-center">
      <div className="flex items-center justify-center gap-3">
        <MailIcon className="shrink-0 mt-2" />
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-primary">
          Únete a nuestra ronda
        </h2>
      </div>

        <p className="font-body-md text-on-surface-variant mb-8 max-w-lg mx-auto">
          Recibe cartas editoriales sobre nuevos lanzamientos, eventos de taller y un 10% de cortesía en tu primera orden.
        </p>

        {isSubmitted ? (
          <div className="p-4 bg-surface border border-outline-variant text-primary font-body-md animate-fade-in">
            ¡Gracias por unirte! Revisa tu bandeja de entrada para confirmar tu suscripción.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full"
          >
            <div className="relative w-full sm:w-auto sm:flex-grow max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico..."
                required
                disabled={isLoading}
                className="w-full px-4 py-3 bg-surface border border-outline-variant font-body-md text-on-surface placeholder:text-outline focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-3 bg-primary-container text-on-primary font-label-uppercase text-label-uppercase tracking-widest uppercase hover:bg-secondary transition-colors duration-150 shrink-0 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Uniendo...' : 'Unirse'}
            </button>
          </form>
        )}

        <p className="font-body-sm text-[11px] text-outline mt-3">
          Respetamos tu tranquilidad. Enviamos únicamente dos cartas al mes.
        </p>
      </div>
    </section>
  );
}