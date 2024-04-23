'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Activos", [
      {
        numSerie: 1,
        numInventario: 1,
        descripcion: "Computadora potente con CPU multicore, 16 GB de RAM, SSD de 512 GB y pantalla Full HD de 15.6'. Sistema operativo: Windows 10 Pro. Conectividad: Wi-Fi 6, Bluetooth 5.0.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numSerie: 2,
        numInventario: 2,
        descripcion: "Impresora láser compacta con velocidad de impresión de 30 ppm, resolución de 1200 dpi y capacidad de papel de 250 hojas. Conexión USB 3.0 para una fácil integración.",
        responsableId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numSerie: 3,
        numInventario: 3,
        descripcion: "Portátil ligera con procesador dual-core, 8 GB de RAM y SSD de 256 GB. Pantalla HD de 14 pulgadas y sistema operativo Windows 10 Home.",
        responsableId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numSerie: 4,
        numInventario: 4,
        descripcion: "Wearable con pantalla táctil a color, monitoreo de salud, seguimiento de actividad física, y resistencia al agua. Compatible con smartphones y diversas aplicaciones.",
        responsableId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numSerie: 5,
        numInventario: 5,
        descripcion: "Proyector de alta definición con resolución Full HD, 3000 lúmenes y tecnología LED para imágenes brillantes y nítidas. Conectividad versátil, incluyendo HDMI y USB, y altavoces integrados para una experiencia audiovisual completa.",
        responsableId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numSerie: 6,
        numInventario: 6,
        descripcion: "Chromebook resistente con procesador dual-core, 4 GB de RAM y almacenamiento eMMC de 32 GB. Pantalla HD de 11 pulgadas, teclado resistente a derrames y sistema operativo Chrome OS.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numSerie: 7,
        numInventario: 7,
        descripcion: "Laptop ultraligera con procesador de última generación, 8 GB de RAM, SSD de 256 GB y pantalla táctil de 13.3 pulgadas. Diseño elegante de aluminio, teclado retroiluminado y autonomía de batería de hasta 10 horas.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numSerie: 8,
        numInventario: 8,
        descripcion: "Altavoz portátil resistente al agua con conectividad Bluetooth. Diseñado para su uso en exteriores, con batería recargable y calidad de sonido nítida.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numSerie: 9,
        numInventario: 9,
        descripcion: "Osciloscopio Tektronix de alto rendimiento con ancho de banda de 100 MHz, pantalla a color de 7 pulgadas y tecnología de visualización avanzada.",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Activos", null, {})
  }
};
