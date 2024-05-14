'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Activos", [
      {
        numSerie: 1,
        numInventario: 1,
        descripcion: "Computadora potente de escritorio con CPU multicore, 16 GB de RAM y SSD de 512 GB. Sistema operativo: Windows 10 Pro.",
        imagen: await obtenerImagen("https://images.unsplash.com/photo-1618339220157-daa2cd9ade56?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numSerie: 2,
        numInventario: 2,
        descripcion: "Impresora láser compacta con velocidad de impresión de 30 ppm, resolución de 1200 dpi y capacidad de papel de 250 hojas. Conexión USB 3.0 para una fácil integración.",
        imagen: await obtenerImagen("https://images.unsplash.com/photo-1650696868612-4b836291b323?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numSerie: 3,
        numInventario: 3,
        descripcion: "Portátil ligera con procesador dual-core, 8 GB de RAM y SSD de 256 GB. Pantalla HD de 14 pulgadas y sistema operativo Windows 10 Home.",
        imagen: await obtenerImagen("https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numSerie: 4,
        numInventario: 4,
        descripcion: "Wearable con pantalla táctil a color, monitoreo de salud, seguimiento de actividad física, y resistencia al agua. Compatible con smartphones y diversas aplicaciones.",
        imagen: await obtenerImagen("https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numSerie: 5,
        numInventario: 5,
        descripcion: "Proyector de alta definición con resolución Full HD, 3000 lúmenes y tecnología LED para imágenes brillantes y nítidas. Conectividad versátil, incluyendo HDMI y USB, y altavoces integrados para una experiencia audiovisual completa.",
        imagen: await obtenerImagen("https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numSerie: 6,
        numInventario: 6,
        descripcion: "Chromebook resistente con procesador dual-core, 4 GB de RAM y almacenamiento eMMC de 32 GB. Pantalla HD de 11 pulgadas, teclado resistente a derrames y sistema operativo Chrome OS.",
        imagen: await obtenerImagen("https://images.unsplash.com/photo-1522202222206-b75023c48f4f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numSerie: 7,
        numInventario: 7,
        descripcion: "Laptop ultraligera con procesador de última generación, 8 GB de RAM, SSD de 256 GB y pantalla táctil de 13.3 pulgadas. Diseño elegante de aluminio, teclado retroiluminado y autonomía de batería de hasta 10 horas.",
        imagen: await obtenerImagen("https://images.unsplash.com/photo-1660833638050-41f95d8b94e6?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numSerie: 8,
        numInventario: 8,
        descripcion: "Altavoz portátil resistente al agua con conectividad Bluetooth. Diseñado para su uso en exteriores, con batería recargable y calidad de sonido nítida.",
        imagen: await obtenerImagen("https://images.unsplash.com/photo-1612205643212-22b0715c29b8?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numSerie: 9,
        numInventario: 9,
        descripcion: "Osciloscopio Tektronix de alto rendimiento con ancho de banda de 100 MHz, pantalla a color de 7 pulgadas y tecnología de visualización avanzada.",
        imagen: await obtenerImagen("https://radiosurtidora.com/cdn/shop/products/TBS1000C_3c0c87a4-193b-438a-8945-8df05d2020f9_600x.jpg?v=1628617145"),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Activos")
    await queryInterface.sequelize.query("alter table activos auto_increment = 1;")
  }
};

async function obtenerImagen(url) {
  const axios = require('axios')

  try {
      return (await axios.get(url, { responseType: 'arraybuffer'})).data
  } catch {
      return null
  }
}