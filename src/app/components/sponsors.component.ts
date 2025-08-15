import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-sponsors',
  imports: [LucideAngularModule],
  template: `
    <!-- Sponsors Section -->
    <section class="py-24 relative overflow-hidden bg-slate-950">
      <div
        class="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      ></div>
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,194,242,0.03),transparent_70%)]"
      ></div>

      <!-- Floating elements -->
      <div
        class="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/5 to-transparent rounded-full blur-3xl animate-float"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-yellow-400/5 to-transparent rounded-full blur-3xl animate-float animation-delay-1000"
      ></div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-16">
          <div
            class="bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-black text-xl px-6 py-3 mb-6 animate-pulse shadow-lg shadow-cyan-400/30 inline-block rounded"
          >
            APOYADO POR LOS MEJORES
          </div>
          <h2 class="text-5xl md:text-7xl font-black mb-8 relative">
            <span
              class="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent animate-gradient-x"
            >
              NUESTROS
            </span>
            <br />
            <span
              class="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
            >
              PATROCINADORES
            </span>

            <!-- Decorative elements -->
            <div
              class="absolute -top-4 -left-4 w-8 h-8 border-2 border-cyan-400 rotate-45 animate-spin-slow"
            ></div>
            <div
              class="absolute -bottom-4 -right-4 w-6 h-6 bg-yellow-400 rotate-45 animate-pulse"
            ></div>
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Marcas líderes que comparten nuestra
            <span class="text-cyan-400 font-bold">pasión por el fitness</span> y
            apoyan la
            <span class="text-yellow-400 font-bold">excelencia deportiva</span>
          </p>
        </div>

        <!-- Main sponsors marquee -->
        <div class="relative mb-16">
          <div
            class="flex flex-wrap justify-center items-center gap-3 max-w-5xl mx-auto"
          >
            <!-- First set of sponsors -->
            @for (sponsor of sponsors; track sponsor.name) {
              <a
                [href]="sponsor.url"
                target="_blank"
                rel="noopener noreferrer"
                class="block flex-shrink-0 w-[200px] h-[100px] mx-4 relative group/sponsor"
              >
                <div
                  class="w-full h-full flex items-center justify-center p-4 transition-all duration-500 group-hover/sponsor:scale-110"
                >
                  <img
                    [src]="sponsor.logo"
                    [alt]="sponsor.name + ' logo'"
                    class="max-w-full max-h-full rounded object-contain transition-all duration-500 group-hover/sponsor:drop-shadow-lg grayscale group-hover/sponsor:grayscale-0"
                  />

                  <!-- Hover glow effect -->
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-yellow-400/10 rounded opacity-0 group-hover/sponsor:opacity-100 transition-opacity duration-500"
                  ></div>
                </div>

                <!-- Sponsor name tooltip -->
                <div
                  class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-cyan-400 text-xs font-bold px-2 py-1 rounded opacity-0 group-hover/sponsor:opacity-100 transition-all duration-300 whitespace-nowrap"
                >
                  {{ sponsor.name }}
                </div>
            </a>
            }
          </div>
        </div>

        <!-- Partnership call-to-action -->
        <div class="text-center">
          <div
            class="bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-yellow-400/30 rounded-2xl p-8 max-w-2xl mx-auto group hover:border-yellow-400 transition-all duration-500"
          >
            <i-lucide
              name="handshake"
              class="w-12 h-12 text-yellow-400 mx-auto mb-4 group-hover:animate-bounce"
            ></i-lucide>
            <h3 class="text-2xl font-black text-white mb-4">
              ¿Quieres formar parte de
              <span
                class="bg-gradient-to-r from-cyan-400 to-yellow-400 bg-clip-text text-transparent"
              >
                HYBIZA RACE?
              </span>
            </h3>
            <p
              class="text-gray-300 mb-6 group-hover:text-white transition-colors duration-300"
            >
              Únete como patrocinador y apoya el evento de fitness más épico de
              las Islas Baleares
            </p>
            <a
              href="mailto:info@hybizarace.com"
              class="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-slate-900 font-black px-8 py-3 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-400/30"
            >
              <i-lucide name="mail" class="w-4 h-4 mr-2"></i-lucide>
              CONTACTAR
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      @keyframes float {
        0%,
        100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-20px);
        }
      }

      .animate-float {
        animation: float 6s ease-in-out infinite;
      }

      .animation-delay-1000 {
        animation-delay: 1s;
      }

      @keyframes gradient-x {
        0%,
        100% {
          background-size: 200% 200%;
          background-position: left center;
        }
        50% {
          background-size: 200% 200%;
          background-position: right center;
        }
      }

      .animate-gradient-x {
        background-size: 200% 200%;
        animation: gradient-x 4s ease infinite;
      }

      @keyframes spin-slow {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .animate-spin-slow {
        animation: spin-slow 3s linear infinite;
      }
    `,
  ],
})
export class SponsorsComponent {
  public readonly sponsors = [
    {
      name: 'Alvaro Morales, Fisioterapia deportiva',
      logo: '/patrocinadores/alvaromorales.png',
      url: 'https://share.google/WATnQ9C9kPX3blCwn',
    },
    {
      name: "Ayuntament d'Eivissa",
      logo: '/patrocinadores/ayuntamientodeibiza.png',
      url: 'https://www.eivissa.es',
    },
    {
      name: 'Cerre Fit',
      logo: '/patrocinadores/cerrefit.png',
      url: 'https://cerrefit.es',
    },
    {
      name: 'EliteChip',
      logo: '/patrocinadores/elitechip.png',
      url: 'https://elitechip.net',
    },
    {
      name: 'Galeno Clinic',
      logo: '/patrocinadores/galenoclinic.png',
      url: 'https://www.galenoclinic.com',
    },
    {
      name: 'HybizaAthletes',
      logo: '/patrocinadores/hybizaathletes.png',
      url: 'https://hybizaathletes.wodbuster.com/',
    },
    {
      name: 'Jordi Costa',
      logo: '/patrocinadores/jordicosta.jpeg',
      url: 'https://jordinutricionista.com',
    },
    {
      name: 'La perdición',
      logo: '/patrocinadores/laperdicion.png',
      url: 'https://www.instagram.com/somosperdicion',
    },
    {
      name: 'Pilates Ibiza',
      logo: '/patrocinadores/pilatesibiza.png',
      url: 'https://pilatesenibiza.com',
    },
    {
      name: 'SingularWod',
      logo: '/patrocinadores/singularwod.png',
      url: 'https://www.singularwod.com',
    },
    {
      name: 'Sisters of Beauty',
      logo: '/patrocinadores/sistersofbeauty.png',
      url: 'https://sistersofbeauty.es',
    },
    {
      name: 'Sportograf',
      logo: '/patrocinadores/sportograf.png',
      url: 'https://www.sportograf.com',
    },
    {
      name: 'Toni Costa, Constructora',
      logo: '/patrocinadores/tonicosta.png',
      url: 'https://tonicostaconstructora.com',
    },
    {
      name: 'VibraHotels',
      logo: '/patrocinadores/vibrahotels.jpg',
      url: 'https://vibrahotels.com',
    },
  ];
}
