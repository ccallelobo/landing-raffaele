"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Datos de ejemplo para el caso "Sonrisa Gingival"
// con múltiples ángulos (frontal, perfil izquierdo, perfil derecho)
const casoSonrisaGingival = {
  id: 1,
  titulo: "Sonrisa Gingival",
  descripcion: "Corrección de exposición excesiva de encía mediante técnica mínimamente invasiva",
  angulos: [
    {
      nombre: "Frontal",
      before: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=1000&fit=crop&crop=face",
      after: "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=800&h=1000&fit=crop&crop=face",
    },
    {
      nombre: "Perfil Izquierdo",
      before: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&crop=face",
      after: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1000&fit=crop&crop=face",
    },
    {
      nombre: "Perfil Derecho",
      before: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&h=1000&fit=crop&crop=face",
      after: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1000&fit=crop&crop=face",
    },
  ],
};

// Segundo caso de ejemplo
const casoRinoplastia = {
  id: 2,
  titulo: "Rinoplastia",
  descripcion: "Refinamiento nasal con técnica cerrada para un resultado natural",
  angulos: [
    {
      nombre: "Frontal",
      before: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=1000&fit=crop&crop=face",
      after: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1000&fit=crop&crop=face",
    },
    {
      nombre: "Perfil",
      before: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1000&fit=crop&crop=face",
      after: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=1000&fit=crop&crop=face",
    },
  ],
};

const casos = [casoSonrisaGingival, casoRinoplastia];

// ============================================
// OPCIÓN 1: Modal Fullscreen
// ============================================
function Opcion1ModalFullscreen() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCaso, setSelectedCaso] = useState(casos[0]);
  const [currentAngulo, setCurrentAngulo] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleOpenModal = (caso: typeof casos[0]) => {
    setSelectedCaso(caso);
    setCurrentAngulo(0);
    setSliderPosition(50);
    setModalOpen(true);
  };

  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleSliderMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleSliderMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <div className="bg-noir text-white py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-display mb-2">Opción 1: Modal Fullscreen</h3>
        <p className="text-white/50 mb-8 text-sm">Click en una card abre un modal grande con slider y galería de thumbnails para navegar entre ángulos.</p>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {casos.map((caso) => (
            <button
              key={caso.id}
              onClick={() => handleOpenModal(caso)}
              className="group relative overflow-hidden rounded-lg aspect-[4/3] text-left"
            >
              {/* Preview image (primer ángulo, after) */}
              <Image
                src={caso.angulos[0].after}
                alt={caso.titulo}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-gold text-xs tracking-widest uppercase mb-2 block">
                  {caso.angulos.length} ángulos
                </span>
                <h4 className="font-display text-2xl mb-1">{caso.titulo}</h4>
                <p className="text-white/60 text-sm line-clamp-2">{caso.descripcion}</p>
              </div>
              {/* Icono de expandir */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Modal */}
        {modalOpen && (
          <div
            className="fixed inset-0 z-50 bg-noir/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setModalOpen(false)}
          >
            <div
              className="relative w-full max-w-6xl max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="font-display text-3xl">{selectedCaso.titulo}</h4>
                  <p className="text-white/50 text-sm mt-1">{selectedCaso.descripcion}</p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Slider principal */}
              <div
                ref={sliderRef}
                className="relative aspect-[4/3] md:aspect-[16/9] rounded-xl overflow-hidden cursor-ew-resize select-none flex-1"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
              >
                {/* After image (fondo) */}
                <Image
                  src={selectedCaso.angulos[currentAngulo].after}
                  alt="Después"
                  fill
                  className="object-cover"
                  draggable={false}
                />
                {/* Before image (clip) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <Image
                    src={selectedCaso.angulos[currentAngulo].before}
                    alt="Antes"
                    fill
                    className="object-cover"
                    draggable={false}
                  />
                </div>
                {/* Slider line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl">
                    <svg className="w-6 h-6 text-noir" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </div>
                {/* Labels */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/50 backdrop-blur rounded text-sm font-medium">
                  Antes
                </div>
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur rounded text-sm font-medium">
                  Después
                </div>
              </div>

              {/* Thumbnails de ángulos */}
              <div className="flex gap-3 mt-6 justify-center">
                {selectedCaso.angulos.map((angulo, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentAngulo(index);
                      setSliderPosition(50);
                    }}
                    className={`relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all ${
                      currentAngulo === index
                        ? "ring-2 ring-gold ring-offset-2 ring-offset-noir"
                        : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={angulo.after}
                      alt={angulo.nombre}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 text-xs py-1 text-center">
                      {angulo.nombre}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// OPCIÓN 2: Expandible In-Place
// ============================================
function Opcion2ExpandibleInPlace() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [currentAngulo, setCurrentAngulo] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleSliderMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleSliderMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  const toggleExpand = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      setCurrentAngulo(0);
      setSliderPosition(50);
    }
  };

  return (
    <div className="bg-stone text-noir py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-display mb-2">Opción 2: Expandible In-Place</h3>
        <p className="text-noir/50 mb-8 text-sm">La card se expande en el mismo lugar mostrando la galería completa sin abrir un modal.</p>

        <div className="space-y-4">
          {casos.map((caso) => {
            const isExpanded = expandedId === caso.id;
            return (
              <div
                key={caso.id}
                className={`bg-white rounded-2xl overflow-hidden transition-all duration-500 ${
                  isExpanded ? "shadow-2xl" : "shadow-lg hover:shadow-xl"
                }`}
              >
                {/* Header clickeable */}
                <button
                  onClick={() => toggleExpand(caso.id)}
                  className="w-full flex items-center gap-6 p-4 md:p-6 text-left"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={caso.angulos[0].after}
                      alt={caso.titulo}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-gold text-xs tracking-widest uppercase mb-1 block">
                      {caso.angulos.length} ángulos disponibles
                    </span>
                    <h4 className="font-display text-xl md:text-2xl mb-1">{caso.titulo}</h4>
                    <p className="text-noir/50 text-sm line-clamp-1">{caso.descripcion}</p>
                  </div>
                  {/* Icono expandir */}
                  <div className={`w-10 h-10 rounded-full bg-noir/5 flex items-center justify-center transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                    <svg className="w-5 h-5 text-noir" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Contenido expandido */}
                <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="px-4 md:px-6 pb-6">
                    {/* Tabs de ángulos */}
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                      {caso.angulos.map((angulo, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentAngulo(index);
                            setSliderPosition(50);
                          }}
                          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                            currentAngulo === index
                              ? "bg-gold text-white"
                              : "bg-noir/5 text-noir/70 hover:bg-noir/10"
                          }`}
                        >
                          {angulo.nombre}
                        </button>
                      ))}
                    </div>

                    {/* Slider antes/después */}
                    <div
                      ref={sliderRef}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-ew-resize select-none"
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onTouchMove={handleTouchMove}
                    >
                      {/* After image (fondo) */}
                      <Image
                        src={caso.angulos[currentAngulo].after}
                        alt="Después"
                        fill
                        className="object-cover"
                        draggable={false}
                      />
                      {/* Before image (clip) */}
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                      >
                        <Image
                          src={caso.angulos[currentAngulo].before}
                          alt="Antes"
                          fill
                          className="object-cover"
                          draggable={false}
                        />
                      </div>
                      {/* Slider line */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                        style={{ left: `${sliderPosition}%` }}
                      >
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xl">
                          <svg className="w-5 h-5 text-noir" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                          </svg>
                        </div>
                      </div>
                      {/* Labels */}
                      <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/50 backdrop-blur rounded text-sm font-medium text-white">
                        Antes
                      </div>
                      <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur rounded text-sm font-medium text-white">
                        Después
                      </div>
                    </div>

                    {/* Mini thumbnails abajo */}
                    <div className="flex gap-2 mt-4 justify-center">
                      {caso.angulos.map((angulo, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentAngulo(index);
                            setSliderPosition(50);
                          }}
                          className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all ${
                            currentAngulo === index
                              ? "ring-2 ring-gold"
                              : "opacity-50 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={angulo.after}
                            alt={angulo.nombre}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================
// OPCIÓN 3: Carrusel Doble Sincronizado
// ============================================
function Opcion3CarruselDoble() {
  const [selectedCaso, setSelectedCaso] = useState(casos[0]);
  const [currentAngulo, setCurrentAngulo] = useState(0);

  const nextAngulo = () => {
    setCurrentAngulo((prev) => (prev + 1) % selectedCaso.angulos.length);
  };

  const prevAngulo = () => {
    setCurrentAngulo((prev) => (prev - 1 + selectedCaso.angulos.length) % selectedCaso.angulos.length);
  };

  return (
    <div className="bg-moss/30 text-noir py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-display mb-2">Opción 3: Carrusel Doble Sincronizado</h3>
        <p className="text-noir/50 mb-8 text-sm">Dos carruseles lado a lado (antes/después) que se mueven sincronizados al cambiar de ángulo.</p>

        {/* Selector de caso */}
        <div className="flex gap-3 mb-8">
          {casos.map((caso) => (
            <button
              key={caso.id}
              onClick={() => {
                setSelectedCaso(caso);
                setCurrentAngulo(0);
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                selectedCaso.id === caso.id
                  ? "bg-gold text-white"
                  : "bg-white text-noir hover:bg-white/80"
              }`}
            >
              {caso.titulo}
            </button>
          ))}
        </div>

        {/* Carruseles sincronizados */}
        <div className="relative">
          {/* Grid de antes/después */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Carrusel ANTES */}
            <div className="relative">
              <div className="absolute top-4 left-4 z-10 px-4 py-2 bg-noir text-white rounded-full text-sm font-semibold tracking-wide">
                ANTES
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white shadow-lg">
                {selectedCaso.angulos.map((angulo, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ${
                      index === currentAngulo
                        ? "opacity-100 translate-x-0"
                        : index < currentAngulo
                          ? "opacity-0 -translate-x-full"
                          : "opacity-0 translate-x-full"
                    }`}
                  >
                    <Image
                      src={angulo.before}
                      alt={`${angulo.nombre} - Antes`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Carrusel DESPUÉS */}
            <div className="relative">
              <div className="absolute top-4 right-4 z-10 px-4 py-2 bg-gold text-white rounded-full text-sm font-semibold tracking-wide">
                DESPUÉS
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white shadow-lg">
                {selectedCaso.angulos.map((angulo, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ${
                      index === currentAngulo
                        ? "opacity-100 translate-x-0"
                        : index < currentAngulo
                          ? "opacity-0 -translate-x-full"
                          : "opacity-0 translate-x-full"
                    }`}
                  >
                    <Image
                      src={angulo.after}
                      alt={`${angulo.nombre} - Después`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Controles de navegación */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevAngulo}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gold hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Indicadores de ángulo */}
            <div className="flex items-center gap-3">
              {selectedCaso.angulos.map((angulo, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentAngulo(index)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    index === currentAngulo
                      ? "bg-gold text-white"
                      : "bg-white text-noir/60 hover:text-noir"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${index === currentAngulo ? "bg-white" : "bg-noir/30"}`} />
                  <span className="text-sm font-medium">{angulo.nombre}</span>
                </button>
              ))}
            </div>

            <button
              onClick={nextAngulo}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gold hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Info del caso */}
        <div className="mt-8 text-center">
          <h4 className="font-display text-2xl mb-2">{selectedCaso.titulo}</h4>
          <p className="text-noir/50 max-w-lg mx-auto">{selectedCaso.descripcion}</p>
        </div>
      </div>
    </div>
  );
}

// ============================================
// PÁGINA PRINCIPAL DE PROTOTIPOS
// ============================================
export default function PrototiposPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-noir text-white py-12 px-8">
        <div className="max-w-6xl mx-auto">
          <span className="text-gold text-xs tracking-widest uppercase mb-4 block">
            Prototipos de diseño
          </span>
          <h1 className="font-display text-4xl md:text-5xl mb-4">
            Sección &quot;Casos de Éxito&quot;
          </h1>
          <p className="text-white/60 max-w-2xl">
            Tres opciones de diseño para mostrar casos con múltiples imágenes antes/después
            (diferentes ángulos). Evalúa cada opción y elige la que mejor se adapte a la estética
            y experiencia deseada.
          </p>
        </div>
      </div>

      {/* Opciones */}
      <Opcion1ModalFullscreen />
      <Opcion2ExpandibleInPlace />
      <Opcion3CarruselDoble />

      {/* Footer con resumen */}
      <div className="bg-noir text-white py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl mb-8 text-center">Resumen de Opciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="font-display text-xl text-gold mb-3">Opción 1: Modal</h3>
              <ul className="text-white/60 text-sm space-y-2">
                <li>✓ Vista grande e inmersiva</li>
                <li>✓ Foco completo en el caso</li>
                <li>✓ Navegación clara entre ángulos</li>
                <li>○ Requiere interacción extra para abrir</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="font-display text-xl text-gold mb-3">Opción 2: Expandible</h3>
              <ul className="text-white/60 text-sm space-y-2">
                <li>✓ Sin salir del contexto de la página</li>
                <li>✓ Comparación rápida entre casos</li>
                <li>✓ Experiencia fluida tipo acordeón</li>
                <li>○ Menos espacio para mostrar detalles</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="font-display text-xl text-gold mb-3">Opción 3: Carrusel Doble</h3>
              <ul className="text-white/60 text-sm space-y-2">
                <li>✓ Comparación lado a lado clara</li>
                <li>✓ Sincronización visual impactante</li>
                <li>✓ Navegación intuitiva</li>
                <li>○ Ocupa más espacio vertical</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
