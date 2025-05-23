// Traducciones
const translations = {
  // Navegación
  'Inicio': {
    es: 'Inicio',
    maya: 'Ka\'ansik',
    en: 'Home'
  },
  'TechnoAbuelos': {
    es: 'TechnoAbuelos',
    maya: 'TechnoAbuelos',
    en: 'TechElders'
  },
  'Tianguis': {
    es: 'Tianguis',
    maya: 'Tianguis',
    en: 'Marketplace'
  },
  'Contacto': {
    es: 'Contacto',
    maya: 'K\'ajóoltik',
    en: 'Contact'
  },
  // Modo oscuro
  'Modo Oscuro': {
    es: 'Modo Oscuro',
    maya: 'Modo Oscuro',
    en: 'Dark Mode'
  },
  'Modo Claro': {
    es: 'Modo Claro',
    maya: 'Modo Claro',
    en: 'Light Mode'
  },
  // Búsqueda
  'Buscar': {
    es: 'Buscar',
    maya: 'Ka\'ansik',
    en: 'Search'
  },
  'Buscar productos...': {
    es: 'Buscar productos...',
    maya: 'Ka\'ansik productos...',
    en: 'Search products...'
  },
  // Formulario de producto
  'Añadir Nuevo Producto': {
    es: 'Añadir Nuevo Producto',
    maya: 'Táan u yáanal producto',
    en: 'Add New Product'
  },
  'Nombre del Producto:': {
    es: 'Nombre del Producto:',
    maya: 'K\'aaba\'al producto:',
    en: 'Product Name:'
  },
  'Descripción:': {
    es: 'Descripción:',
    maya: 'Táan u beetik:',
    en: 'Description:'
  },
  'Precio (MXN):': {
    es: 'Precio (MXN):',
    maya: 'Precio (MXN):',
    en: 'Price (MXN):'
  },
  'Cantidad Disponible:': {
    es: 'Cantidad Disponible:',
    maya: 'Cantidad disponible:',
    en: 'Available Quantity:'
  },
  'Nombre del Vendedor:': {
    es: 'Nombre del Vendedor:',
    maya: 'K\'aaba\'al vendedor:',
    en: 'Seller Name:'
  },
  'WhatsApp del Vendedor:': {
    es: 'WhatsApp del Vendedor:',
    maya: 'WhatsApp vendedor:',
    en: 'Seller\'s WhatsApp:'
  },
  'Fotos del Producto:': {
    es: 'Fotos del Producto:',
    maya: 'Fotos producto:',
    en: 'Product Photos:'
  },
  'Publicar Producto': {
    es: 'Publicar Producto',
    maya: 'Táan u yáanal producto',
    en: 'Publish Product'
  },
  // Producto
  'Hecha por:': {
    es: 'Hecha por:',
    maya: 'U beetik:',
    en: 'Made by:'
  },
  'Cantidad disponible:': {
    es: 'Cantidad disponible:',
    maya: 'Cantidad disponible:',
    en: 'Available quantity:'
  },
  'Contactar por WhatsApp': {
    es: 'Contactar por WhatsApp',
    maya: 'K\'ajóoltik WhatsApp',
    en: 'Contact via WhatsApp'
  },
  // Mensajes
  'Por favor, selecciona una imagen para el producto': {
    es: 'Por favor, selecciona una imagen para el producto',
    maya: 'Táan u yáanal foto ti\' producto',
    en: 'Please select an image for the product'
  }
};

// Estado global
let currentLanguage = 'es';

// Función para obtener traducción
function getTranslation(text, lang = currentLanguage) {
  return translations[text]?.[lang] || text;
}

// Función para cambiar el idioma
function changeLanguage(lang) {
  currentLanguage = lang;
  
  // Actualizar botones de idioma
  document.querySelectorAll('.language-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent.includes(lang.toUpperCase())) {
      btn.classList.add('active');
    }
  });

  // Actualizar textos de la página
  document.querySelectorAll('[data-es]').forEach(element => {
    if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
      element.placeholder = element.getAttribute(`data-${lang}-placeholder`) || element.getAttribute('data-es-placeholder');
    } else {
      element.textContent = element.getAttribute(`data-${lang}`) || element.getAttribute('data-es');
    }
  });

  // Actualizar productos si estamos en la página de tianguis
  if (typeof displayProducts === 'function') {
    displayProducts();
  }
}

// Función para alternar modo oscuro
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const darkModeBtn = document.querySelector('.dark-mode-toggle');
  const icon = darkModeBtn.querySelector('i');
  
  if (document.body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    darkModeBtn.innerHTML = `<i class="fas fa-sun"></i> ${getTranslation('Modo Claro')}`;
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    darkModeBtn.innerHTML = `<i class="fas fa-moon"></i> ${getTranslation('Modo Oscuro')}`;
  }
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
  // Agregar botones de idioma si no existen
  if (!document.querySelector('.language-buttons')) {
    const nav = document.querySelector('nav');
    const languageButtons = document.createElement('div');
    languageButtons.className = 'language-buttons';
    languageButtons.innerHTML = `
      <button class="language-btn" onclick="changeLanguage('es')">
        <i class="fas fa-globe"></i> ES
      </button>
      <button class="language-btn" onclick="changeLanguage('maya')">
        <i class="fas fa-globe"></i> MAYA
      </button>
      <button class="language-btn" onclick="changeLanguage('en')">
        <i class="fas fa-globe"></i> EN
      </button>
    `;
    nav.insertBefore(languageButtons, nav.querySelector('.dark-mode-toggle'));
  }

  // Agregar atributos de traducción a elementos comunes
  document.querySelectorAll('a[href]').forEach(link => {
    if (!link.hasAttribute('data-es')) {
      const text = link.textContent.trim();
      if (translations[text]) {
        link.setAttribute('data-es', translations[text].es);
        link.setAttribute('data-maya', translations[text].maya);
        link.setAttribute('data-en', translations[text].en);
      }
    }
  });

  // Inicializar en español
  changeLanguage('es');
}); 