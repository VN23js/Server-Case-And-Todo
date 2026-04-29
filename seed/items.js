import mongoose from 'mongoose';
import Items from '../models/Items.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Case from '../models/Case.js';

export const skins = [
  //Жёлтое
  {
    nameWeapon: '★ Паракорд-нож',
    nameSkin: 'Ночная полоса',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0PzadQJR_OO4nYeDg-TgIbLBk1Rd4cJ5ntbN9J7yjRrm-0ZpMmrxcY_Bcw85N1iBrle4wei8hMfo75qcyCZm7ikr5CrZl0Gzn1gSOdkUfbCN/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2c2718, #42391c)',
    rarity: 'rare',
    price: 12400,
    glowColor: '#e9b51d', // ← добавили цвет свечения
    glowRgb: '233, 181, 29',
  },
  {
    nameWeapon: '★ Складной нож',
    nameSkin: 'Чистая вода',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJK9eO5l4WKmcj_PbLXk1Rd4cJ5nqeX8d-gjg22qEs4YzihJtLEdQc_Y1nV_wLowum605G0vsjMzXA27CMj-z-DyJnxTCcv/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2c2718, #42391c)',
    rarity: 'rare',
    price: 12400,
    glowColor: '#e9b51d', // ← добавили цвет свечения
    glowRgb: '233, 181, 29',
  },
  //Красное
  {
    nameWeapon: 'M4A1-S',
    nameSkin: 'Скоростной зверь',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alDLPIhm5D18d0i_rVyoD8j1yg5UBta2zzLYWSdAA_aFvVq1G4w7rq05Dq7cvMmHM1uiJ0sS3Un0e_hxlSLrs4IEpMMwQ/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #38211c, #54211d)', // color card
    rarity: 'rare',
    price: 4000,
    glowColor: '#ff594d', // ← добавили цвет свечения
    glowRgb: '255, 89, 77',
  },
  //Розовое
  {
    nameWeapon: 'Tec-9',
    nameSkin: 'Зеркальная мозаика',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5tgKeKBAXWvzO9std5_HRajkBw1vwKJk4jxNWXFP1UhDsYkRbUMsxC6lNSzNO7lsQaK2dpCyH2rjS5J5i054exUVqQi5OSJ2C0RseXl/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2d1325, #421b37)',
    rarity: 'rare',
    price: 400,
    glowColor: '#f949c4', // ← добавили цвет свечения
    glowRgb: '249, 73, 196',
  },
  {
    nameWeapon: 'Tec-9',
    nameSkin: 'Топливный инжектор',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhnwMzcdD4b08-jhIWZlP_1IbzUklRd4cJ5nqfEpon3iwbkrUJsNjimJISSewZoNFHV_VG9k-jvjJ_t786YyCZisiAr-z-DyHMz0KNe/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2d1325, #421b37)',
    rarity: 'rare',
    price: 380,
    glowColor: '#f949c4', // ← добавили цвет свечения
    glowRgb: '249, 73, 196',
  },
  {
    nameWeapon: 'AK-47',
    nameSkin: 'Жгучая ярость',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhh2KefTjha_NC5h4mdksj4OrzZgiUD7cYh3OrD9Ir3jlHm8kVvNmrxIYbDcQM5Nw7V81S-le65g8O57ZWd1zI97UqDJ3MF/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2d1325, #421b37)',
    rarity: 'epic', // фиолетовое
    price: 700,
    glowColor: '#f949c4', // ← добавили цвет свечения
    glowRgb: '249, 73, 196',
  },
  {
    nameWeapon: 'UMP-45',
    nameSkin: 'Неонуар',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1Jfxv7YJWh94tm5q46EnuXLP7LWnn8fvpMo2eqWrN32jAfh-0dvMmn1LNTGI1A9MF6C_gXvwOnp0JPq6p3Nymwj5HfRA-XBQw/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2d1325, #421b37)',
    rarity: 'rare',
    price: 360,
    glowColor: '#f949c4', // ← добавили цвет свечения
    glowRgb: '249, 73, 196',
  },

  // 5-8: Тайное (красное) + Промышленное
  {
    nameWeapon: 'AWP',
    nameSkin: 'Двойственность',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FABz7PLfYQJO5dG0m7-Ymfb_NoTdn2xZ_Pp9i_vG8MKj2A3s_xA5Yjz2d4fEdldtYFiF8lK6xeq-jMS76Zqfzno37ikqt36IgVXp1nRPIMmn/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2d1325, #421b37)',
    rarity: 'legendary',
    price: 950,
    glowColor: '#f949c4', // ← добавили цвет свечения
    glowRgb: '249, 73, 196',
  },
  {
    nameWeapon: 'XM1014',
    nameSkin: 'Целую-обнимаю',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgporrf0e1Y07PLZTiVPvYznwL-bgvn_DLfYkWNF18lwmO7Eu9T23lG2_hE_NWvwIIeSewE_YgnV-AO_kOu6h5Tvupmay3MwvyIi5XjD30vg9oIGPLs/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2d1325, #421b37)',
    rarity: 'rare',
    price: 340,
    glowColor: '#f949c4', // ← добавили цвет свечения
    glowRgb: '249, 73, 196',
  },
  {
    nameWeapon: 'Glock-18',
    nameSkin: 'Мода',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0Ob3djFN79eJkZmOlPj6J7rSglRd4cJ5nqfH99us0Ayw-hdvN2ClcoeQe1A2YAzTqVHqyL_t0Mfv7pTOzydhsiQg-z-DyG7C7dXc/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2d1325, #421b37)',
    rarity: 'rare',
    price: 320,
    glowColor: '#f949c4', // ← добавили цвет свечения
    glowRgb: '249, 73, 196',
  },
  {
    nameWeapon: 'MAC-10',
    nameSkin: 'Дискотехника',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldf0Ob3fDxBvYyJmoGIhfLLP7LWnn8fsJV3i7vHpdqs2VHn_BZqNmuiJoGQd1Q2MF-G_ALtlei908e0v8vKm2wj5Hc7W34J8g/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2d1325, #421b37)',
    rarity: 'rare',
    price: 300,
    glowColor: '#f949c4', // ← добавили цвет свечения
    glowRgb: '249, 73, 196',
  },

  // 9-12: Промышленное + Тайное
  {
    nameWeapon: 'Tec-9',
    nameSkin: 'Удалённый доступ',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhnwMzcdD4b09m4go-SqPv9NLPF2DsHsMcpieuV8IiljgDk_UdqYW37JobHJARtN1vUrwLtxb3sjcK07p_XiSw06UaFxPk/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2d1325, #421b37)',
    rarity: 'rare',
    price: 280,
    glowColor: '#f949c4', // ← добавили цвет свечения
    glowRgb: '249, 73, 196',
  },
  {
    nameWeapon: 'M4A1-S',
    nameSkin: 'Ночной кошмар',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITfn2xZ_MhwmOz--YXygED6_Us5a2DxcdSRJlNqMAzY-li8weu-gMDovJufyHVmuCklsX6PyhTk0wYMMLLeV8xVfw/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2d1325, #421b37)',
    rarity: 'legendary',
    price: 900,
    glowColor: '#f949c4', // ← добавили цвет свечения
    glowRgb: '249, 73, 196',
  },
  {
    nameWeapon: 'AUG',
    nameSkin: 'Стимфалийская птица',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFABz7PLddgJR-MW7hIiKm_71PYTTn3lV-_p9g-7J4cKl0ADkqEdpNzvyJ47EcgE8Zl2D-FO7wb_vjZ696sjOzHA1uCdx43_cgVXp1nDtdJ8l/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2d1325, #421b37)',
    rarity: 'rare',
    price: 260,
    glowColor: '#f949c4', // ← добавили цвет свечения
    glowRgb: '249, 73, 196',
  },
  {
    nameWeapon: 'M4A1-S',
    nameSkin: 'Опустошитель',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uOxh7-Gw_alDL_UlWJc6dF-mNbN_Iv9nBrhqhVkYTz6LYSScVBtMliB_gDqwuu9h5-7vc_PynVrvXV37HfUyxPmn1gSOa-1kwUB/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2d1325, #421b37)',
    rarity: 'epic',
    price: 650,
    glowColor: '#f949c4', // ← добавили цвет свечения
    glowRgb: '249, 73, 196',
  },

  // 13-16: Разные редкости
  {
    nameWeapon: 'USP-S',
    nameSkin: 'Извилины',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8j3Jq_ummJW4NE_376S84-tiwHt_0VqZDzwI47DcVNqaFDZ-gLrxea918S5tJucwSY2uj5iuygjNe-uOA/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2d1325, #421b37)',
    rarity: 'rare',
    price: 240,
    glowColor: '#f949c4', // ← добавили цвет свечения
    glowRgb: '249, 73, 196',
  },
  {
    nameWeapon: 'AWP',
    nameSkin: 'Элитное снаряжение',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJP7c-ikZKSqPv9NLPF2D0Av8Ai2byRod_z2gHkqBc-aj31dYLGdQ82NFjX_wPryOvphcXo6JnXiSw0NEnp7Nc/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2d1325, #421b37)',
    rarity: 'rare',
    price: 220,
    glowColor: '#f949c4', // ← добавили цвет свечения
    glowRgb: '249, 73, 196',
  },
  {
    nameWeapon: 'AK-47',
    nameSkin: 'Буйство красок',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV08y5nY6fqPP9ILrDhGpI18l4jeHVu4702FLiqBA4MDv6JYHEIwRsNQ3Srwe-wu_t1pO76JrPyiNlu3Qh4X7D30vg5znacIE/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2d1325, #421b37)',
    rarity: 'legendary',
    price: 1000,
    glowColor: '#f949c4', // ← добавили цвет свечения
    glowRgb: '249, 73, 196',
  },
  {
    nameWeapon: 'XM1014',
    nameSkin: 'Спокойствие',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgporrf0e1Y07PDdTiVPvYznwL-IluX9J7rCqWdY781lxLmXpYmj2wPsrUY-ZjihItDGdwVvYwyC_lS_l-27g57utJ3KyiRguiQ8pSGKKGgJqwY/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2d1325, #421b37)',
    rarity: 'common', // ширпотреб
    price: 150,
    glowColor: '#f949c4', // ← добавили цвет свечения
    glowRgb: '249, 73, 196',
    glowColor: '#f949c4', // ← добавили цвет свечения
    glowRgb: '249, 73, 196',
  },

  // 17-20: Промышленное + Эпик
  {
    nameWeapon: 'SSG 08',
    nameSkin: 'Большая пушка',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopamie19f0Ob3Yi5FvISJgIWIn_n9MLrdn39I18l4jeHVu9302AHjqkJoMDjyLYfGJwc8Z1rZr1G4w-_o1sTptJvJwHVnviRw5XzD30vgQmdxPxk/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2d1325, #421b37)',
    rarity: 'rare',
    price: 200,
    glowColor: '#f949c4', // ← добавили цвет свечения
    glowRgb: '249, 73, 196',
  },
  {
    nameWeapon: 'P250',
    nameSkin: 'Картель',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhhwszYI2gS09-3hpSOm8j4OrzZgiVVvpZ0i7iQotWm3FW38xVlMm3zddDAcgQ5NwnUq1C6wua718S9u5rO1zI97QJBKztq/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2d1325, #421b37)',
    rarity: 'rare',
    price: 180,
    glowColor: '#f949c4', // ← добавили цвет свечения
    glowRgb: '249, 73, 196',
  },
  {
    nameWeapon: 'AWP',
    nameSkin: 'Фобос',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FABz7PLfYQJS5NO0m5O0m_7zO6-fkGhQsZMgieqYrI-i2ACy-0o_Z22mItOdcAU5aVzT_gTowbvth5a0u4OJlyU2Brz6WA/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #1f1430, #291549)',
    rarity: 'epic',
    price: 600,
    glowColor: '#7214ff',
    glowRgb: '114, 20, 255',
  },
  {
    nameWeapon: 'Обрез',
    nameSkin: 'Безмятежность',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbuyLgNv1fX3cih9_92hkYSEkfHLN77Hl1Rd4cJ5nqeY84rxjQTgrUE6Y2HxcNXAdg88M1qGq1frw-vv05C16pjKwSNmunIn-z-DyMFXoJu6/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #1f1430, #291549)',
    rarity: 'common',
    price: 100,
    glowColor: '#7214ff',
    glowRgb: '114, 20, 255',
  },

  // 21-24: Эпик + Промышленное
  {
    nameWeapon: 'USP-S',
    nameSkin: 'Кровопролитная элита',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09Siq5KOk8jxN7zUhVRd4cJ5nqfHodun3AKy-hc_a276JYfEIFM7aQzYqFS4yOm61MXpv8nKm3dl7CN0-z-DyAQKbHsO/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #1f1430, #291549)',
    rarity: 'epic',
    price: 550,
    glowColor: '#7214ff',
    glowRgb: '114, 20, 255',
  },
  {
    nameWeapon: 'Desert Eagle',
    nameSkin: 'Шелковица',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7ODHdAJS4Mm7q4yCkP_gfenSzzxXsJcjiOjHrdSlige2r0o-MTynJoaddQQ5aAvU_QW4yO_o08ei_MOe6928QZw/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #1f1430, #291549)',
    rarity: 'legendary',
    price: 850,
    glowColor: '#7214ff',
    glowRgb: '114, 20, 255',
  },
  {
    nameWeapon: 'Nova',
    nameSkin: 'Карп кои',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouLWzKjhjxszGfitD09e5nb-HnvD8J_WDzmgC7sAh2e-Wptr33AywrhZtYzzycY6dJwE5MAvQ-FC9w7q818e6ot2XnnuHYbTd/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #1f1430, #291549)',
    rarity: 'common',
    price: 90,
    glowColor: '#7214ff',
    glowRgb: '114, 20, 255',
  },
  {
    nameWeapon: 'Glock-18',
    nameSkin: 'Жернов',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0uL3djFN79eJl4-Cm_LwDLfYkWNFpsEljurD89zx2gPg_Eo-amyiINfBdgVtYl6G-QO9l-271p677s-dwXZ9-n51WfGqKvY/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #1f1430, #291549)',
    rarity: 'common',
    price: 80,
    glowColor: '#7214ff',
    glowRgb: '114, 20, 255',
  },

  // 25-28: Ширпотреб + Промышленное
  {
    nameWeapon: 'P2000',
    nameSkin: 'Протравленный',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovrG1eVcwg8zJYAJSvozmxL-KlP7wDLjdmX1U-vp9g-7J4cKsigK3_BVuMGmhcIWVJlU4Z13X-gK6wO_vhJe-tcjImHRhvnFw4i3VgVXp1gW66kp5/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #1f1430, #291549)',
    rarity: 'common',
    price: 70,
    glowColor: '#7214ff',
    glowRgb: '114, 20, 255',
  },
  {
    nameWeapon: 'SSG 08',
    nameSkin: 'Призрачный фанатик',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopamie19f1OD3Yi5FvISJlZKGlvT7Ib7ummJW4NE_2r2Sptin0ALtqEVoNmiiJI6UcgE-ZF2B_gS_k-3sh8fotc7Oz3Ewuj5iuygoy1B0ow/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #1f1430, #291549)',
    rarity: 'common',
    price: 60,
    glowColor: '#7214ff',
    glowRgb: '114, 20, 255',
  },
  {
    nameWeapon: 'FAMAS',
    nameSkin: 'Нейронная сеть',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLuoKhRf0v73dzxP7c-JkI-fhMj4OrzZgiVV65N327CTotT3iVfh-RY9Y2-hLNOWdwE4NwnT-FW4w-q5h8C0vs_N1zI97WjxIji5/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #1f1430, #291549)',
    rarity: 'common',
    price: 50,
    glowColor: '#7214ff',
    glowRgb: '114, 20, 255',
  },
  {
    nameWeapon: 'UMP-45',
    nameSkin: 'Лунная ночь',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1Jf0vL3ZDBSuImJmY-EmeX9IL7uhX5f-8BlteXI8oThxgLnqBVuZGCiIoDBewM5ZF-G_gfrl7vrjJ7utJTNwXJqvCYq7XjdlxapwUYbQ8Jk1rE/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #1f1430, #291549)',
    rarity: 'common',
    price: 40,
    glowColor: '#7214ff',
    glowRgb: '114, 20, 255',
  },

  // 29-32: Ширпотреб
  {
    nameWeapon: 'MP7',
    nameSkin: 'Градиент',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6ryFAZh7PXJdTh94czhq4yCkP_gfb7VwzgGsZAn3L_Codigjge2-0M9Z2D1LIaTcAM_ZQrTqAO7lbrug5Ci_MOeD_P4rHw/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #1f1430, #291549)',
    rarity: 'common',
    price: 30,
    glowColor: '#7214ff',
    glowRgb: '114, 20, 255',
  },
  {
    nameWeapon: 'Tec-9',
    nameSkin: 'Лавина',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhjxszcdD4b092glYyKmfT8NoTdn2xZ_It0iL-Wp9r02gDk80c-NWylJ9WdIQ5tZliDrlnrkO3ogZS57ZrJwSdgpGB8sqmt10R9/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #1f1430, #291549)',
    rarity: 'common',
    price: 20,
    glowColor: '#7214ff',
    glowRgb: '114, 20, 255',
  },
  {
    nameWeapon: 'SG 553',
    nameSkin: 'Пульс',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFf0Ob3YjoXuY-JhJWHhPLLO77QgHIfvJ1z3r7D9I3x3VLj-hFoNWv0INWRJAY6YgnX-1PtxObvjZW9vJnLmGwj5HfKkzxTug/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #1f1430, #291549)',
    rarity: 'common',
    price: 10,
    glowColor: '#7214ff',
    glowRgb: '114, 20, 255',
  },
  {
    nameWeapon: 'M4A1-S',
    nameSkin: 'Взгляд в прошлое',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alDL3dl3hZ6sRygdbN_Iv9nBrhrkU_YT32LITBcQU-YV7U-FTsx--71pbpvMjBmnBr73N2tHaLlxC0n1gSOTTnAQeD/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #1f1430, #291549)',
    rarity: 'common',
    price: 5,
    glowColor: '#7214ff',
    glowRgb: '114, 20, 255',
  },

  // 33-34: Ширпотреб
  {
    nameWeapon: 'AUG',
    nameSkin: 'Застарелое дерево',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFA957PfaaAJV49Oyq4yCkP_gDLfQhGxUpsAl2O-QrNr2iley-hZoMD_6dtSVIAU2Yw2C-lfsx-vu1JTt6cnJynp9-n51IkGWGeI/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #191f30, #1f2b4c)',
    rarity: 'common',
    price: 4,
    glowColor: '#2bade6', // ← голубой
    glowRgb: '43, 173, 230',
  },
  {
    nameWeapon: 'AK-47',
    nameSkin: 'Плавный переход',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszPYzxS5NW1q4-dkuX4MqLul2AFv_p9g-7J4cKk3gOy-kI4YGD0LdXHdw47Y1_Vrle6wrzuhsS96J_MyyAxvHEmtHnYgVXp1hyNAMKW/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #132228, #18303a)',
    rarity: 'common',
    price: 3,
    glowColor: '#2bade6', // ← голубой
    glowRgb: '43, 173, 230',
  },
  {
    nameWeapon: 'USP-S',
    nameSkin: 'Нержавейка',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ092nq5WYh8jnJ7rYmGdU-9ZOhuDG_Zi721Lirhc-azyhcIKUcQ45ZVrV-lW2xOe6hcK_6ZqazHMyuCNx5naJzQv330_GtPNhtQ/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #132228, #18303a)',
    rarity: 'common',
    price: 2,
    glowColor: '#2bade6', // ← голубой
    glowRgb: '43, 173, 230',
  },
];

export const newSkin = [
  //Жёлтое
  {
    nameWeapon: '★ Перчатки «Сломанный клык»',
    nameSkin: 'Остриё иглы',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAR0hwIQFTibi3JAxl3fXJfzp969C5goWYqPjkNqnQgmJe5pQhte_N-p70hGu4ohQ0JwavdcTCJxg2ZlvYr1XtxL25gZ7t7ZzPynQy6XIqtyvUlx2_1Rweb-c50PWXHQqfGeUXS4D0SPQ1/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2c2718, #42391c)',
    rarity: 'rare',
    price: 18400,
    glowColor: '#e9b51d', // ← добавили цвет свечения
    glowRgb: '233, 181, 29',
  },
  //Жёлтое
  {
    nameWeapon: '★ Классический нож',
    nameSkin: 'Поверхностная закалка',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ODbTjxT09O_mIWPqPv9NLPF2DkBuJUgib2Q8NX3jgex-hBtNzj6LYWdIQ9oZlqB81K7w-rugpO575XXiSw0EEOhUO8/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2c2718, #42391c)',
    rarity: 'rare',
    price: 28400,
    glowColor: '#e9b51d', // ← добавили цвет свечения
    glowRgb: '233, 181, 29',
  },
  {
    //Красное
    nameWeapon: 'M4A1-S',
    nameSkin: 'Золотая спираль',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uOxh7-Gw_alIITCmGpa7cd4nuz-8oP5jGu4ohQ0J3f2I4LEIVM5Zg3R-lW6lby5hse_tJqfy3Jj6CIq43jenBfiiB9IOOJvm7XAHiKtaglX/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #38211c, #54211d)',
    rarity: 'rare',
    price: 10400,
    glowColor: '#ff594d', // ← добавили цвет свечения
    glowRgb: '255, 89, 77',
  },
  {
    //Красное
    nameWeapon: 'USP-S',
    nameSkin: 'Поток информации',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8jkIbLfgnhF-sBwh9bN_Iv9nGu4qgE7Nnf6coPHIVI6N1HUrgO9lefpgMS_7p-cziFg63FxsHvan0C-hR5Kbe1vm7XAHvG9VQ0j/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #38211c, #54211d)',
    rarity: 'rare',
    price: 5500,
    glowColor: '#ff594d', // ← добавили цвет свечения
    glowRgb: '255, 89, 77',
  },
  {
    //Красное
    nameWeapon: 'M4A4',
    nameSkin: 'Неонуар',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwW09Kzm7-FmP7mDLfYkWNFpsch2evFo9Wl2lflr0RtZzilJNTBdgE3ZAyDr1nrx-vs0cK9vsmamnt9-n51UgTl8ms/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #38211c, #54211d)',
    rarity: 'rare',
    price: 7500,
    glowColor: '#ff594d', // ← добавили цвет свечения
    glowRgb: '255, 89, 77',
  },
  {
    //Розовое
    nameWeapon: 'P90',
    nameSkin: 'Треугольник',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FAR17OORIQJW_tWxm460n_L1JaKfwj8D6sd03b6S942g2AO3_EBuYzrzLdLAIwFoZVDZrlbtwLvo0Za6vIOJlyUAaERRJg/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2d1325, #421b37)',
    rarity: 'rare',
    price: 1380,
    glowColor: '#f949c4', // ← добавили цвет свечения
    glowRgb: '249, 73, 196',
  },
  {
    //Розовое
    nameWeapon: 'AWP',
    nameSkin: 'Ледяной уголь',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0PutbZtuL_GfC2OvzedxuPUnS3u3wR8lsTzTn4qqcXuXOlQmCpUiQOdYtUG_ltXgP-u04wWL3Y9NnjK-0H2dw8uldQ/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2d1325, #421b37)',
    rarity: 'rare',
    price: 1780,
    glowColor: '#f949c4', // ← добавили цвет свечения
    glowRgb: '249, 73, 196',
  },
  {
    //Розовое
    nameWeapon: 'AK-47',
    nameSkin: 'Фантомный вредитель',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJenAWu-OmnIGFg_j5DL_YhXlE-NF-mNbN_Iv9nBq3-kc6MDyhcYeSIwJtYAnV-ljrlb3qjJHuv56dmiBq6CV2tiuMnBfln1gSOdwFZ75X/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2d1325, #421b37)',
    rarity: 'rare',
    price: 1980,
    glowColor: '#f949c4', // ← добавили цвет свечения
    glowRgb: '249, 73, 196',
  },
  {
    //Розовое
    nameWeapon: 'UMP-45',
    nameSkin: 'Динамика',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1Jf0Ob3ZDBS092kho-chMj4OrzZgiUJu8Mgj7-Yp47xiVK18kE6YWCgcYeQI1NsM1jS_1G8kue6gpbqvprP1zI97Q1q27dN/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #2d1325, #421b37)',
    rarity: 'rare',
    price: 980,
    glowColor: '#f949c4', // ← добавили цвет свечения
    glowRgb: '249, 73, 196',
  },
  {
    //Синий
    nameWeapon: 'Glock-18',
    nameSkin: 'Блок-18',
    linkImg:
      'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf1P_HcjZ97s6_l4u0mvj6N6nYl2Vu5Mx2gv2Pp9jxjAa3r0JtZz-icNTAcAI9aQrU-wW-yenmhJG8tZiaynRk63YgtmGdwUJc6eYXpA/120fx90fdpx2x 2x',
    color: 'linear-gradient(180deg, #1f1430, #291549)',
    rarity: 'common',
    price: 170,
    glowColor: '#7214ff',
    glowRgb: '114, 20, 255',
  },
];

export const caseItems = [
  {
    name: 'Гавайский Павлин',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1772889692/poUplSmwM15eo16jD7tB7FDL1MPT5ZNP1i51xgeI_cyrmrz.png',
    price: 250,
    category: 'Teplo Poshlo',
    items: [
      //Красное
      '69aed384dbca747fc8e0fecb', // "M4A1-S | Золотая спираль"
      //Красное
      //Розовое
      '69a96dd62f9fdf961f4a9f9e', // "AK-47 | Жгучая ярость"
      '69a96dd62f9fdf961f4a9f9f', // "UMP-45 | Неонуар"
      '69aed384dbca747fc8e0fed0', // "AK-47 | Фантомный вредитель"
      '69a96dd62f9fdf961f4a9fa4', // "Tec-9 | Удалённый доступ"

      //Розовое
      //Фиолетовое
      '69a96dd62f9fdf961f4a9fae', // "AWP | Фобос"
      '69a96dd62f9fdf961f4a9faf', // "Обрез | Безмятежность"
      '69a96dd62f9fdf961f4a9fb0', // "USP-S | Кровопролитная элита"
      '69a96dd62f9fdf961f4a9fb1', // "Desert Eagle | Шелковица"
      '69a96dd62f9fdf961f4a9fb2', // "Nova | Карп кои"
      '69aed384dbca747fc8e0fed2', // "Glock-18 | Блок-18"
      '69a96dd62f9fdf961f4a9fb3', // "Glock-18 | Жернов"
      '69a96dd62f9fdf961f4a9fb4', // "P2000 | Протравленный"
      '69a96dd62f9fdf961f4a9fb5', // "SSG 08 | Призрачный фанатик"
      '69a96dd62f9fdf961f4a9fb6', // "FAMAS | Нейронная сеть"
      '69a96dd62f9fdf961f4a9fb7', // "UMP-45 | Лунная ночь"
      '69a96dd62f9fdf961f4a9fb8', // "MP7 | Градиент"
      '69a96dd62f9fdf961f4a9fb9', // "Tec-9 | Лавина"
      '69a96dd62f9fdf961f4a9fba', // "SG 553 | Пульс"
      //Фиолетовое
      //Ширп
      '69a96dd62f9fdf961f4a9fbb', // "M4A1-S | Взгляд в прошлое"
      '69a96dd62f9fdf961f4a9fbc', // "AUG | Застарелое дерево"
      //Ширп
    ],
  },
  {
    name: 'Весенние каникулы',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1772889102/Ly2IyhBxmcpgs92MVYwT2fClzlXUNWr4TWAcFkFf_pylr8l.png',
    price: 450,
    category: 'Teplo Poshlo',
    items: [
      //Красное
      '69a96dd62f9fdf961f4a9f9b', // "M4A1-S | Скоростной зверь"
      '69aed384dbca747fc8e0fecb', // "M4A1-S | Золотая спираль"
      //Красное
      //Розовое
      '69a96dd62f9fdf961f4a9f9c', // "Tec-9 | Зеркальная мозаика"
      '69a96dd62f9fdf961f4a9f9d', // "Tec-9 | Топливный инжектор"
      '69a96dd62f9fdf961f4a9f9e', // "AK-47 | Жгучая ярость"
      '69a96dd62f9fdf961f4a9f9f', // "UMP-45 | Неонуар"
      '69aed384dbca747fc8e0fed1', // "UMP-45 | Динамика"
      '69a96dd62f9fdf961f4a9fa0', // "AWP | Двойственность"
      '69a96dd62f9fdf961f4a9fa1', // "XM1014 | Целую-обнимаю"
      //Розовое
      //Фиолетовое
      '69a96dd62f9fdf961f4a9fae', // "AWP | Фобос"
      '69a96dd62f9fdf961f4a9faf', // "Обрез | Безмятежность"
      '69a96dd62f9fdf961f4a9fb0', // "USP-S | Кровопролитная элита"
      '69a96dd62f9fdf961f4a9fb1', // "Desert Eagle | Шелковица"
      '69a96dd62f9fdf961f4a9fb2', // "Nova | Карп кои"
      '69aed384dbca747fc8e0fed2', // "Glock-18 | Блок-18"
      '69a96dd62f9fdf961f4a9fb3', // "Glock-18 | Жернов"
      '69a96dd62f9fdf961f4a9fb4', // "P2000 | Протравленный"
      '69a96dd62f9fdf961f4a9fb5', // "SSG 08 | Призрачный фанатик"
      '69a96dd62f9fdf961f4a9fb6', // "FAMAS | Нейронная сеть"
      '69a96dd62f9fdf961f4a9fb7', // "UMP-45 | Лунная ночь"
      '69a96dd62f9fdf961f4a9fb8', // "MP7 | Градиент"
      '69a96dd62f9fdf961f4a9fb9', // "Tec-9 | Лавина"
      '69a96dd62f9fdf961f4a9fba', // "SG 553 | Пульс"
      //Фиолетовое
      //Ширп
      '69a96dd62f9fdf961f4a9fbb', // "M4A1-S | Взгляд в прошлое"
      '69a96dd62f9fdf961f4a9fbc', // "AUG | Застарелое дерево"
      '69a96dd62f9fdf961f4a9fbd', // "AK-47 | Плавный переход"
      '69a96dd62f9fdf961f4a9fbe', // "USP-S | Нержавейка"
      //Ширп
    ],
  },
  {
    name: 'Обострение',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1772889692/qv2kIZVLGbCBgdP3tSMe1XfparRbrlZ59xTp8CpG_zokmxd.png',
    price: 750,
    category: 'Teplo Poshlo',
    items: [
      //Желтое
      '69a96dd62f9fdf961f4a9f99', // "★ Паракорд-нож | Ночная полоса"
      //Желтое
      //Красное
      '69aed384dbca747fc8e0fecc', // "USP-S | Поток информации"
      '69aed384dbca747fc8e0fecd', // "M4A4 | Неонуар"
      //Красное
      //Розовое
      '69aed384dbca747fc8e0fed1', // "UMP-45 | Динамика"
      '69a96dd62f9fdf961f4a9fa0', // "AWP | Двойственность"
      '69a96dd62f9fdf961f4a9fa1', // "XM1014 | Целую-обнимаю"
      '69aed384dbca747fc8e0fece', // "P90 | Треугольник"
      '69aed384dbca747fc8e0fecf', // "AWP | Ледяной уголь"
      '69a96dd62f9fdf961f4a9fa2', // "Glock-18 | Мода"
      '69a96dd62f9fdf961f4a9fa3', // "MAC-10 | Дискотехника"
      '69aed384dbca747fc8e0fed0', // "AK-47 | Фантомный вредитель"
      '69a96dd62f9fdf961f4a9fa4', // "Tec-9 | Удалённый доступ"
      '69a96dd62f9fdf961f4a9fa5', // "M4A1-S | Ночной кошмар"
      '69a96dd62f9fdf961f4a9fa6', // "AUG | Стимфалийская птица"
      '69a96dd62f9fdf961f4a9fa7', // "M4A1-S | Опустошитель"
      '69a96dd62f9fdf961f4a9faa', // "AK-47 | Буйство красок"
      '69a96dd62f9fdf961f4a9fab', // "XM1014 | Спокойствие"
      '69a96dd62f9fdf961f4a9fac', // "SSG 08 | Большая пушка"
      '69a96dd62f9fdf961f4a9fad', // "P250 | Картель"
      //Розовое
      //Фиолетовое
      '69a96dd62f9fdf961f4a9fb5', // "SSG 08 | Призрачный фанатик"
      '69a96dd62f9fdf961f4a9fb6', // "FAMAS | Нейронная сеть"
      '69a96dd62f9fdf961f4a9fb7', // "UMP-45 | Лунная ночь"
      '69a96dd62f9fdf961f4a9fb9', // "Tec-9 | Лавина"
      '69a96dd62f9fdf961f4a9fba', // "SG 553 | Пульс"
      //Фиолетовое
      //Ширп
      '69a96dd62f9fdf961f4a9fbb', // "M4A1-S | Взгляд в прошлое"
      '69a96dd62f9fdf961f4a9fbc', // "AUG | Застарелое дерево"
      '69a96dd62f9fdf961f4a9fbd', // "AK-47 | Плавный переход"
      '69a96dd62f9fdf961f4a9fbe', // "USP-S | Нержавейка"
      //Ширп
    ],
  },
  {
    name: 'Глиномес',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1772889692/PpvdcKDVG9SJDYtOnYiJNmF5jhOGjctjIvM5Givt_dov3rt.png',
    price: 250,
    category: 'Teplo Poshlo',
    items: [
      //Красное
      '69a96dd62f9fdf961f4a9f9b', // "M4A1-S | Скоростной зверь"
      '69aed384dbca747fc8e0fecb', // "M4A1-S | Золотая спираль"
      '69aed384dbca747fc8e0fecd', // "M4A4 | Неонуар"
      //Красное
      //Розовое
      '69a96dd62f9fdf961f4a9f9c', // "Tec-9 | Зеркальная мозаика"
      '69a96dd62f9fdf961f4a9f9d', // "Tec-9 | Топливный инжектор"
      '69a96dd62f9fdf961f4a9f9e', // "AK-47 | Жгучая ярость"
      '69a96dd62f9fdf961f4a9fa9', // "AWP | Элитное снаряжение"
      '69a96dd62f9fdf961f4a9faa', // "AK-47 | Буйство красок"
      '69a96dd62f9fdf961f4a9fab', // "XM1014 | Спокойствие"
      '69a96dd62f9fdf961f4a9fac', // "SSG 08 | Большая пушка"
      '69a96dd62f9fdf961f4a9fad', // "P250 | Картель"
      //Розовое
      //Фиолетовое
      '69a96dd62f9fdf961f4a9fae', // "AWP | Фобос"
      '69a96dd62f9fdf961f4a9faf', // "Обрез | Безмятежность"
      '69a96dd62f9fdf961f4a9fb0', // "USP-S | Кровопролитная элита"
      '69a96dd62f9fdf961f4a9fb1', // "Desert Eagle | Шелковица"
      '69a96dd62f9fdf961f4a9fb2', // "Nova | Карп кои"
      '69aed384dbca747fc8e0fed2', // "Glock-18 | Блок-18"
      '69a96dd62f9fdf961f4a9fb3', // "Glock-18 | Жернов"
      '69a96dd62f9fdf961f4a9fb4', // "P2000 | Протравленный"
      '69a96dd62f9fdf961f4a9fb5', // "SSG 08 | Призрачный фанатик"
      '69a96dd62f9fdf961f4a9fb6', // "FAMAS | Нейронная сеть"
      '69a96dd62f9fdf961f4a9fb7', // "UMP-45 | Лунная ночь"
      '69a96dd62f9fdf961f4a9fb8', // "MP7 | Градиент"
      '69a96dd62f9fdf961f4a9fb9', // "Tec-9 | Лавина"
      '69a96dd62f9fdf961f4a9fba', // "SG 553 | Пульс"
      //Фиолетовое
      //Ширп
      '69a96dd62f9fdf961f4a9fbb', // "M4A1-S | Взгляд в прошлое"
      '69a96dd62f9fdf961f4a9fbc', // "AUG | Застарелое дерево"
      '69a96dd62f9fdf961f4a9fbd', // "AK-47 | Плавный переход"
      //Ширп
    ],
  },
  {
    name: 'Завали хлебало',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1772889692/Lnt2DvYoXV5f5FSLg3hMeOceDkCuEB7QSYFkhaVZ_m6tvvf.png',
    price: 2320,
    category: 'Teplo Poshlo',
    items: [
      //Желтое
      '69a96dd62f9fdf961f4a9f99', // "★ Паракорд-нож | Ночная полоса"
      '69a96dd62f9fdf961f4a9f9a', // "★ Складной нож | Чистая вода"
      '69aed384dbca747fc8e0fec9', // "★ Перчатки «Сломанный клык» | Остриё иглы"
      '69aed384dbca747fc8e0feca', // "★ Классический нож | Поверхностная закалка"
      //Желтое
      //Красное
      '69a96dd62f9fdf961f4a9f9b', // "M4A1-S | Скоростной зверь"
      '69aed384dbca747fc8e0fecb', // "M4A1-S | Золотая спираль"
      '69aed384dbca747fc8e0fecc', // "USP-S | Поток информации"
      '69aed384dbca747fc8e0fecd', // "M4A4 | Неонуар"
      //Красное
      //Розовое
      '69a96dd62f9fdf961f4a9f9c', // "Tec-9 | Зеркальная мозаика"
      '69a96dd62f9fdf961f4a9f9d', // "Tec-9 | Топливный инжектор"
      '69a96dd62f9fdf961f4a9f9e', // "AK-47 | Жгучая ярость"
      '69a96dd62f9fdf961f4a9f9f', // "UMP-45 | Неонуар"
      '69aed384dbca747fc8e0fed1', // "UMP-45 | Динамика"
      '69a96dd62f9fdf961f4a9fa0', // "AWP | Двойственность"
      '69a96dd62f9fdf961f4a9fa1', // "XM1014 | Целую-обнимаю"
      '69aed384dbca747fc8e0fece', // "P90 | Треугольник"
      '69aed384dbca747fc8e0fecf', // "AWP | Ледяной уголь"
      '69a96dd62f9fdf961f4a9fa2', // "Glock-18 | Мода"
      '69a96dd62f9fdf961f4a9fa3', // "MAC-10 | Дискотехника"
      '69aed384dbca747fc8e0fed0', // "AK-47 | Фантомный вредитель"
      '69a96dd62f9fdf961f4a9fa4', // "Tec-9 | Удалённый доступ"
      '69a96dd62f9fdf961f4a9fa5', // "M4A1-S | Ночной кошмар"
      '69a96dd62f9fdf961f4a9fa6', // "AUG | Стимфалийская птица"
      '69a96dd62f9fdf961f4a9fa7', // "M4A1-S | Опустошитель"
      '69a96dd62f9fdf961f4a9fa8', // "USP-S | Извилины"
      '69a96dd62f9fdf961f4a9fa9', // "AWP | Элитное снаряжение"
      '69a96dd62f9fdf961f4a9faa', // "AK-47 | Буйство красок"
      '69a96dd62f9fdf961f4a9fab', // "XM1014 | Спокойствие"
      '69a96dd62f9fdf961f4a9fac', // "SSG 08 | Большая пушка"
      '69a96dd62f9fdf961f4a9fad', // "P250 | Картель"
      //Розовое
      //Фиолетовое
      '69a96dd62f9fdf961f4a9fae', // "AWP | Фобос"
      '69a96dd62f9fdf961f4a9faf', // "Обрез | Безмятежность"
      '69a96dd62f9fdf961f4a9fb0', // "USP-S | Кровопролитная элита"
      '69a96dd62f9fdf961f4a9fb1', // "Desert Eagle | Шелковица"
      '69a96dd62f9fdf961f4a9fb2', // "Nova | Карп кои"
      '69aed384dbca747fc8e0fed2', // "Glock-18 | Блок-18"
      '69a96dd62f9fdf961f4a9fb3', // "Glock-18 | Жернов"
      '69a96dd62f9fdf961f4a9fb4', // "P2000 | Протравленный"
      '69a96dd62f9fdf961f4a9fb5', // "SSG 08 | Призрачный фанатик"
      '69a96dd62f9fdf961f4a9fb6', // "FAMAS | Нейронная сеть"
      '69a96dd62f9fdf961f4a9fb7', // "UMP-45 | Лунная ночь"
      '69a96dd62f9fdf961f4a9fb8', // "MP7 | Градиент"
      '69a96dd62f9fdf961f4a9fb9', // "Tec-9 | Лавина"
      '69a96dd62f9fdf961f4a9fba', // "SG 553 | Пульс"
      //Фиолетовое
      //Ширп
      '69a96dd62f9fdf961f4a9fbb', // "M4A1-S | Взгляд в прошлое"
      '69a96dd62f9fdf961f4a9fbc', // "AUG | Застарелое дерево"
      '69a96dd62f9fdf961f4a9fbd', // "AK-47 | Плавный переход"
      '69a96dd62f9fdf961f4a9fbe', // "USP-S | Нержавейка"
      //Ширп
    ],
  },
  {
    name: 'Ведро KFC',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1772889692/5N0WnrwWBevjtbXMQsVi1w8IENuL6owN2eiSGSeJ_nkjdrf.png',
    price: 290,
    category: 'Кейсы КС2',
    items: [
      //Желтое
      '69a96dd62f9fdf961f4a9f99', // "★ Паракорд-нож | Ночная полоса"
      '69a96dd62f9fdf961f4a9f9a', // "★ Складной нож | Чистая вода"
      '69aed384dbca747fc8e0fec9', // "★ Перчатки «Сломанный клык» | Остриё иглы"
      '69aed384dbca747fc8e0feca', // "★ Классический нож | Поверхностная закалка"
      //Желтое
      //Красное
      '69a96dd62f9fdf961f4a9f9b', // "M4A1-S | Скоростной зверь"
      '69aed384dbca747fc8e0fecb', // "M4A1-S | Золотая спираль"
      '69aed384dbca747fc8e0fecc', // "USP-S | Поток информации"
      '69aed384dbca747fc8e0fecd', // "M4A4 | Неонуар"
      //Красное
      //Розовое
      '69aed384dbca747fc8e0fece', // "P90 | Треугольник"
      '69aed384dbca747fc8e0fecf', // "AWP | Ледяной уголь"
      '69a96dd62f9fdf961f4a9fa2', // "Glock-18 | Мода"
      '69a96dd62f9fdf961f4a9fa3', // "MAC-10 | Дискотехника"
      '69aed384dbca747fc8e0fed0', // "AK-47 | Фантомный вредитель"
      '69a96dd62f9fdf961f4a9fa4', // "Tec-9 | Удалённый доступ"
      '69a96dd62f9fdf961f4a9fa5', // "M4A1-S | Ночной кошмар"
      '69a96dd62f9fdf961f4a9fa6', // "AUG | Стимфалийская птица"
      '69a96dd62f9fdf961f4a9fa7', // "M4A1-S | Опустошитель"
      '69a96dd62f9fdf961f4a9fa8', // "USP-S | Извилины"
      '69a96dd62f9fdf961f4a9fa9', // "AWP | Элитное снаряжение"
      '69a96dd62f9fdf961f4a9faa', // "AK-47 | Буйство красок"
      '69a96dd62f9fdf961f4a9fab', // "XM1014 | Спокойствие"
      '69a96dd62f9fdf961f4a9fac', // "SSG 08 | Большая пушка"
      '69a96dd62f9fdf961f4a9fad', // "P250 | Картель"
      //Розовое
    ],
  },
  {
    name: 'Злой фермер',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1772889692/F1GNUM0KNvZxYJgOgKTUD2InmD82UsbkXl1yNekR_suxnqj.png',
    price: 920,
    category: 'Кейсы КС2',
    items: [
      //Желтое
      '69a96dd62f9fdf961f4a9f99', // "★ Паракорд-нож | Ночная полоса"
      '69a96dd62f9fdf961f4a9f9a', // "★ Складной нож | Чистая вода"
      //Желтое
      //Красное
      '69a96dd62f9fdf961f4a9f9b', // "M4A1-S | Скоростной зверь"
      '69aed384dbca747fc8e0fecb', // "M4A1-S | Золотая спираль"
      '69aed384dbca747fc8e0fecc', // "USP-S | Поток информации"
      '69aed384dbca747fc8e0fecd', // "M4A4 | Неонуар"
      //Красное
      //Розовое
      '69a96dd62f9fdf961f4a9f9c', // "Tec-9 | Зеркальная мозаика"
      '69a96dd62f9fdf961f4a9f9d', // "Tec-9 | Топливный инжектор"
      '69a96dd62f9fdf961f4a9f9e', // "AK-47 | Жгучая ярость"
      '69a96dd62f9fdf961f4a9f9f', // "UMP-45 | Неонуар"
      '69aed384dbca747fc8e0fed1', // "UMP-45 | Динамика"
      '69a96dd62f9fdf961f4a9fa0', // "AWP | Двойственность"
      '69a96dd62f9fdf961f4a9fa1', // "XM1014 | Целую-обнимаю"
      '69aed384dbca747fc8e0fece', // "P90 | Треугольник"
      '69aed384dbca747fc8e0fecf', // "AWP | Ледяной уголь"
      '69a96dd62f9fdf961f4a9fa2', // "Glock-18 | Мода"
      '69a96dd62f9fdf961f4a9fa3', // "MAC-10 | Дискотехника"
      '69aed384dbca747fc8e0fed0', // "AK-47 | Фантомный вредитель"
      '69a96dd62f9fdf961f4a9fa4', // "Tec-9 | Удалённый доступ"
      '69a96dd62f9fdf961f4a9fa5', // "M4A1-S | Ночной кошмар"
      '69a96dd62f9fdf961f4a9fa6', // "AUG | Стимфалийская птица"
      '69a96dd62f9fdf961f4a9fa7', // "M4A1-S | Опустошитель"
      '69a96dd62f9fdf961f4a9fa8', // "USP-S | Извилины"
      '69a96dd62f9fdf961f4a9fa9', // "AWP | Элитное снаряжение"
      '69a96dd62f9fdf961f4a9faa', // "AK-47 | Буйство красок"
      '69a96dd62f9fdf961f4a9fab', // "XM1014 | Спокойствие"
      '69a96dd62f9fdf961f4a9fac', // "SSG 08 | Большая пушка"
      '69a96dd62f9fdf961f4a9fad', // "P250 | Картель"
      //Розовое
      //Фиолетовое
      '69a96dd62f9fdf961f4a9fae', // "AWP | Фобос"
      '69a96dd62f9fdf961f4a9faf', // "Обрез | Безмятежность"
      '69a96dd62f9fdf961f4a9fb0', // "USP-S | Кровопролитная элита"
      '69a96dd62f9fdf961f4a9fb1', // "Desert Eagle | Шелковица"
      '69a96dd62f9fdf961f4a9fb2', // "Nova | Карп кои"
      '69aed384dbca747fc8e0fed2', // "Glock-18 | Блок-18"
      '69a96dd62f9fdf961f4a9fb3', // "Glock-18 | Жернов"
      '69a96dd62f9fdf961f4a9fb4', // "P2000 | Протравленный"
      '69a96dd62f9fdf961f4a9fb5', // "SSG 08 | Призрачный фанатик"
      '69a96dd62f9fdf961f4a9fb6', // "FAMAS | Нейронная сеть"
      '69a96dd62f9fdf961f4a9fb7', // "UMP-45 | Лунная ночь"
      '69a96dd62f9fdf961f4a9fb8', // "MP7 | Градиент"
      '69a96dd62f9fdf961f4a9fb9', // "Tec-9 | Лавина"
      '69a96dd62f9fdf961f4a9fba', // "SG 553 | Пульс"
      //Фиолетовое
      //Ширп
      '69a96dd62f9fdf961f4a9fbb', // "M4A1-S | Взгляд в прошлое"
      '69a96dd62f9fdf961f4a9fbd', // "AK-47 | Плавный переход"
      '69a96dd62f9fdf961f4a9fbe', // "USP-S | Нержавейка"
      //Ширп
    ],
  },
  {
    name: 'Train',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1772889693/qguzfqydL0cAocgnxFRxG3q0Bdm8VUR90jK4He4j_kkgasr.png',
    price: 550,
    category: 'Кейсы КС2',
    items: [
      //Желтое
      '69aed384dbca747fc8e0feca', // "★ Классический нож | Поверхностная закалка"
      //Желтое
      //Красное
      '69a96dd62f9fdf961f4a9f9b', // "M4A1-S | Скоростной зверь"
      '69aed384dbca747fc8e0fecb', // "M4A1-S | Золотая спираль"
      '69aed384dbca747fc8e0fecc', // "USP-S | Поток информации"
      '69aed384dbca747fc8e0fecd', // "M4A4 | Неонуар"
      //Красное
      //Розовое
      '69a96dd62f9fdf961f4a9f9c', // "Tec-9 | Зеркальная мозаика"
      '69a96dd62f9fdf961f4a9f9d', // "Tec-9 | Топливный инжектор"
      '69a96dd62f9fdf961f4a9f9e', // "AK-47 | Жгучая ярость"
      '69a96dd62f9fdf961f4a9f9f', // "UMP-45 | Неонуар"
      '69aed384dbca747fc8e0fed1', // "UMP-45 | Динамика"
      '69a96dd62f9fdf961f4a9fa0', // "AWP | Двойственность"
      '69a96dd62f9fdf961f4a9fa1', // "XM1014 | Целую-обнимаю"
      '69aed384dbca747fc8e0fece', // "P90 | Треугольник"
      '69aed384dbca747fc8e0fecf', // "AWP | Ледяной уголь"
      '69a96dd62f9fdf961f4a9fa2', // "Glock-18 | Мода"
      '69a96dd62f9fdf961f4a9fa3', // "MAC-10 | Дискотехника"
      '69aed384dbca747fc8e0fed0', // "AK-47 | Фантомный вредитель"
      '69a96dd62f9fdf961f4a9fa4', // "Tec-9 | Удалённый доступ"
      '69a96dd62f9fdf961f4a9fa5', // "M4A1-S | Ночной кошмар"
      '69a96dd62f9fdf961f4a9fa6', // "AUG | Стимфалийская птица"
      '69a96dd62f9fdf961f4a9fa7', // "M4A1-S | Опустошитель"
      //Розовое
      //Фиолетовое
      '69a96dd62f9fdf961f4a9fb4', // "P2000 | Протравленный"
      '69a96dd62f9fdf961f4a9fb5', // "SSG 08 | Призрачный фанатик"
      '69a96dd62f9fdf961f4a9fb6', // "FAMAS | Нейронная сеть"
      '69a96dd62f9fdf961f4a9fb7', // "UMP-45 | Лунная ночь"
      '69a96dd62f9fdf961f4a9fb8', // "MP7 | Градиент"
      '69a96dd62f9fdf961f4a9fb9', // "Tec-9 | Лавина"
      '69a96dd62f9fdf961f4a9fba', // "SG 553 | Пульс"
      //Фиолетовое
      //Ширп
      '69a96dd62f9fdf961f4a9fbb', // "M4A1-S | Взгляд в прошлое"
      '69a96dd62f9fdf961f4a9fbc', // "AUG | Застарелое дерево"
      '69a96dd62f9fdf961f4a9fbd', // "AK-47 | Плавный переход"
      '69a96dd62f9fdf961f4a9fbe', // "USP-S | Нержавейка"
      //Ширп
    ],
  },
  {
    name: 'Яйцо убийцы богов',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1773143597/6qd7PdGAumleO6bffKT907PfS6d8853Mc4gNcTcd_tgubgx.png',
    price: 180,
    category: 'Кейсы КС2',
    items: [
      //Красное
      '69aed384dbca747fc8e0fecc', // "USP-S | Поток информации"
      '69aed384dbca747fc8e0fecd', // "M4A4 | Неонуар"
      //Красное
      //Розовое
      '69a96dd62f9fdf961f4a9f9c', // "Tec-9 | Зеркальная мозаика"
      '69a96dd62f9fdf961f4a9f9d', // "Tec-9 | Топливный инжектор"
      '69a96dd62f9fdf961f4a9f9e', // "AK-47 | Жгучая ярость"
      '69a96dd62f9fdf961f4a9f9f', // "UMP-45 | Неонуар"
      '69aed384dbca747fc8e0fed1', // "UMP-45 | Динамика"
      '69a96dd62f9fdf961f4a9fa0', // "AWP | Двойственность"
      '69a96dd62f9fdf961f4a9fa1', // "XM1014 | Целую-обнимаю"
      '69aed384dbca747fc8e0fece', // "P90 | Треугольник"
      '69aed384dbca747fc8e0fecf', // "AWP | Ледяной уголь"
      '69a96dd62f9fdf961f4a9fa2', // "Glock-18 | Мода"
      '69a96dd62f9fdf961f4a9fa3', // "MAC-10 | Дискотехника"
      '69aed384dbca747fc8e0fed0', // "AK-47 | Фантомный вредитель"
      '69a96dd62f9fdf961f4a9fa4', // "Tec-9 | Удалённый доступ"
      '69a96dd62f9fdf961f4a9fa5', // "M4A1-S | Ночной кошмар"
      '69a96dd62f9fdf961f4a9fa6', // "AUG | Стимфалийская птица"
      '69a96dd62f9fdf961f4a9fa7', // "M4A1-S | Опустошитель"
      '69a96dd62f9fdf961f4a9fa8', // "USP-S | Извилины"
      '69a96dd62f9fdf961f4a9fa9', // "AWP | Элитное снаряжение"
      '69a96dd62f9fdf961f4a9faa', // "AK-47 | Буйство красок"
      '69a96dd62f9fdf961f4a9fab', // "XM1014 | Спокойствие"
      '69a96dd62f9fdf961f4a9fac', // "SSG 08 | Большая пушка"
      '69a96dd62f9fdf961f4a9fad', // "P250 | Картель"
      //Розовое
      //Фиолетовое
      '69a96dd62f9fdf961f4a9fb1', // "Desert Eagle | Шелковица"
      '69a96dd62f9fdf961f4a9fb2', // "Nova | Карп кои"
      '69aed384dbca747fc8e0fed2', // "Glock-18 | Блок-18"
      '69a96dd62f9fdf961f4a9fb3', // "Glock-18 | Жернов"
      '69a96dd62f9fdf961f4a9fb4', // "P2000 | Протравленный"
      '69a96dd62f9fdf961f4a9fb5', // "SSG 08 | Призрачный фанатик"
      '69a96dd62f9fdf961f4a9fb6', // "FAMAS | Нейронная сеть"
      '69a96dd62f9fdf961f4a9fb7', // "UMP-45 | Лунная ночь"
      '69a96dd62f9fdf961f4a9fb8', // "MP7 | Градиент"
      '69a96dd62f9fdf961f4a9fb9', // "Tec-9 | Лавина"
      '69a96dd62f9fdf961f4a9fba', // "SG 553 | Пульс"
      //Фиолетовое
      //Ширп
      '69a96dd62f9fdf961f4a9fbb', // "M4A1-S | Взгляд в прошлое"
      '69a96dd62f9fdf961f4a9fbc', // "AUG | Застарелое дерево"
      '69a96dd62f9fdf961f4a9fbd', // "AK-47 | Плавный переход"
      '69a96dd62f9fdf961f4a9fbe', // "USP-S | Нержавейка"
      //Ширп
    ],
  },
  {
    name: 'Бубновая шестерка',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1773143599/pE7DeRDLZ3hSSfAU0LtoebkDq8oY6TIP6NSMgkEA_pyoxbh.png',
    price: 910,
    category: 'Кейсы КС2',
    items: [
      //Желтое
      '69aed384dbca747fc8e0fec9', // "★ Перчатки «Сломанный клык» | Остриё иглы"
      '69aed384dbca747fc8e0feca', // "★ Классический нож | Поверхностная закалка"
      //Желтое
      //Красное
      '69a96dd62f9fdf961f4a9f9b', // "M4A1-S | Скоростной зверь"
      '69aed384dbca747fc8e0fecb', // "M4A1-S | Золотая спираль"
      '69aed384dbca747fc8e0fecc', // "USP-S | Поток информации"
      //Красное
      //Розовое
      '69a96dd62f9fdf961f4a9fa0', // "AWP | Двойственность"
      '69a96dd62f9fdf961f4a9fa1', // "XM1014 | Целую-обнимаю"
      '69aed384dbca747fc8e0fece', // "P90 | Треугольник"
      '69aed384dbca747fc8e0fecf', // "AWP | Ледяной уголь"
      '69a96dd62f9fdf961f4a9fa2', // "Glock-18 | Мода"
      '69a96dd62f9fdf961f4a9fa3', // "MAC-10 | Дискотехника"
      '69aed384dbca747fc8e0fed0', // "AK-47 | Фантомный вредитель"
      '69a96dd62f9fdf961f4a9fa4', // "Tec-9 | Удалённый доступ"
      '69a96dd62f9fdf961f4a9fa5', // "M4A1-S | Ночной кошмар"
      '69a96dd62f9fdf961f4a9fa6', // "AUG | Стимфалийская птица"
      '69a96dd62f9fdf961f4a9fa7', // "M4A1-S | Опустошитель"
      '69a96dd62f9fdf961f4a9fa8', // "USP-S | Извилины"
      '69a96dd62f9fdf961f4a9fa9', // "AWP | Элитное снаряжение"
      '69a96dd62f9fdf961f4a9faa', // "AK-47 | Буйство красок"
      '69a96dd62f9fdf961f4a9fab', // "XM1014 | Спокойствие"
      '69a96dd62f9fdf961f4a9fac', // "SSG 08 | Большая пушка"
      '69a96dd62f9fdf961f4a9fad', // "P250 | Картель"
      //Розовое
      //Фиолетовое
      '69a96dd62f9fdf961f4a9fae', // "AWP | Фобос"
      '69a96dd62f9fdf961f4a9faf', // "Обрез | Безмятежность"
      '69a96dd62f9fdf961f4a9fb0', // "USP-S | Кровопролитная элита"
      '69a96dd62f9fdf961f4a9fb1', // "Desert Eagle | Шелковица"
      '69a96dd62f9fdf961f4a9fb2', // "Nova | Карп кои"
      '69aed384dbca747fc8e0fed2', // "Glock-18 | Блок-18"
      '69a96dd62f9fdf961f4a9fb3', // "Glock-18 | Жернов"
      '69a96dd62f9fdf961f4a9fb4', // "P2000 | Протравленный"
      '69a96dd62f9fdf961f4a9fb5', // "SSG 08 | Призрачный фанатик"
      '69a96dd62f9fdf961f4a9fb6', // "FAMAS | Нейронная сеть"
      '69a96dd62f9fdf961f4a9fb7', // "UMP-45 | Лунная ночь"
      '69a96dd62f9fdf961f4a9fb8', // "MP7 | Градиент"
      '69a96dd62f9fdf961f4a9fb9', // "Tec-9 | Лавина"
      '69a96dd62f9fdf961f4a9fba', // "SG 553 | Пульс"
      //Фиолетовое
      //Ширп
      '69a96dd62f9fdf961f4a9fbb', // "M4A1-S | Взгляд в прошлое"
      '69a96dd62f9fdf961f4a9fbc', // "AUG | Застарелое дерево"
      '69a96dd62f9fdf961f4a9fbd', // "AK-47 | Плавный переход"
      '69a96dd62f9fdf961f4a9fbe', // "USP-S | Нержавейка"
      //Ширп
    ],
  },
  {
    name: 'Кейс «Спектр»',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1772889102/spectrum-case.png',
    price: 370,
    category: 'collection',
    items: [
      '69a96dd62f9fdf961f4a9f99',
      '69a96dd62f9fdf961f4a9f9a',
      '69a96dd62f9fdf961f4a9f9b',
      '69a96dd62f9fdf961f4a9f9c',
      '69a96dd62f9fdf961f4a9f9d',
      '69a96dd62f9fdf961f4a9f9e',
      '69a96dd62f9fdf961f4a9f9f',
      '69a96dd62f9fdf961f4a9fa0',
      '69a96dd62f9fdf961f4a9fa1',
      '69a96dd62f9fdf961f4a9fa2',
      '69a96dd62f9fdf961f4a9fa3',
      '69a96dd62f9fdf961f4a9fa4',
      '69a96dd62f9fdf961f4a9fa5',
      '69a96dd62f9fdf961f4a9fa6',
      '69a96dd62f9fdf961f4a9fa7',
      '69a96dd62f9fdf961f4a9fa8',
      '69a96dd62f9fdf961f4a9fa9',
      '69a96dd62f9fdf961f4a9faa',
      '69a96dd62f9fdf961f4a9fab',
      '69a96dd62f9fdf961f4a9fac',
      '69a96dd62f9fdf961f4a9fad',
      '69a96dd62f9fdf961f4a9fae',
      '69a96dd62f9fdf961f4a9faf',
      '69a96dd62f9fdf961f4a9fb0',
      '69a96dd62f9fdf961f4a9fb1',
      '69a96dd62f9fdf961f4a9fb2',
      '69a96dd62f9fdf961f4a9fb3',
      '69a96dd62f9fdf961f4a9fb4',
      '69a96dd62f9fdf961f4a9fb5',
      '69a96dd62f9fdf961f4a9fb6',
      '69a96dd62f9fdf961f4a9fb7',
      '69a96dd62f9fdf961f4a9fb8',
      '69a96dd62f9fdf961f4a9fb9',
      '69a96dd62f9fdf961f4a9fba',
      '69a96dd62f9fdf961f4a9fbb',
      '69a96dd62f9fdf961f4a9fbc',
      '69a96dd62f9fdf961f4a9fbd',
      '69a96dd62f9fdf961f4a9fbe',
    ],
  },
  {
    name: 'Кейс «Гидра»',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1772889102/hydra-case.png',
    price: 920,
    category: 'operation',
    items: [
      '69a96dd62f9fdf961f4a9f99',
      '69a96dd62f9fdf961f4a9f9a',
      '69a96dd62f9fdf961f4a9f9b',
      '69a96dd62f9fdf961f4a9f9c',
      '69a96dd62f9fdf961f4a9f9d',
      '69a96dd62f9fdf961f4a9f9e',
      '69a96dd62f9fdf961f4a9f9f',
      '69a96dd62f9fdf961f4a9fa0',
      '69a96dd62f9fdf961f4a9fa1',
      '69a96dd62f9fdf961f4a9fa2',
      '69a96dd62f9fdf961f4a9fa3',
      '69a96dd62f9fdf961f4a9fa4',
      '69a96dd62f9fdf961f4a9fa5',
      '69a96dd62f9fdf961f4a9fa6',
      '69a96dd62f9fdf961f4a9fa7',
      '69a96dd62f9fdf961f4a9fa8',
      '69a96dd62f9fdf961f4a9fa9',
      '69a96dd62f9fdf961f4a9faa',
      '69a96dd62f9fdf961f4a9fab',
      '69a96dd62f9fdf961f4a9fac',
      '69a96dd62f9fdf961f4a9fad',
      '69a96dd62f9fdf961f4a9fae',
      '69a96dd62f9fdf961f4a9faf',
      '69a96dd62f9fdf961f4a9fb0',
      '69a96dd62f9fdf961f4a9fb1',
      '69a96dd62f9fdf961f4a9fb2',
      '69a96dd62f9fdf961f4a9fb3',
      '69a96dd62f9fdf961f4a9fb4',
      '69a96dd62f9fdf961f4a9fb5',
      '69a96dd62f9fdf961f4a9fb6',
      '69a96dd62f9fdf961f4a9fb7',
      '69a96dd62f9fdf961f4a9fb8',
      '69a96dd62f9fdf961f4a9fb9',
      '69a96dd62f9fdf961f4a9fba',
      '69a96dd62f9fdf961f4a9fbb',
      '69a96dd62f9fdf961f4a9fbc',
      '69a96dd62f9fdf961f4a9fbd',
      '69a96dd62f9fdf961f4a9fbe',
    ],
  },
  {
    name: 'Кейс «Феникс»',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1772889102/phoenix-case.png',
    price: 180,
    category: 'new',
    items: [
      '69a96dd62f9fdf961f4a9f99',
      '69a96dd62f9fdf961f4a9f9a',
      '69a96dd62f9fdf961f4a9f9b',
      '69a96dd62f9fdf961f4a9f9c',
      '69a96dd62f9fdf961f4a9f9d',
      '69a96dd62f9fdf961f4a9f9e',
      '69a96dd62f9fdf961f4a9f9f',
      '69a96dd62f9fdf961f4a9fa0',
      '69a96dd62f9fdf961f4a9fa1',
      '69a96dd62f9fdf961f4a9fa2',
      '69a96dd62f9fdf961f4a9fa3',
      '69a96dd62f9fdf961f4a9fa4',
      '69a96dd62f9fdf961f4a9fa5',
      '69a96dd62f9fdf961f4a9fa6',
      '69a96dd62f9fdf961f4a9fa7',
      '69a96dd62f9fdf961f4a9fa8',
      '69a96dd62f9fdf961f4a9fa9',
      '69a96dd62f9fdf961f4a9faa',
      '69a96dd62f9fdf961f4a9fab',
      '69a96dd62f9fdf961f4a9fac',
      '69a96dd62f9fdf961f4a9fad',
      '69a96dd62f9fdf961f4a9fae',
      '69a96dd62f9fdf961f4a9faf',
      '69a96dd62f9fdf961f4a9fb0',
      '69a96dd62f9fdf961f4a9fb1',
      '69a96dd62f9fdf961f4a9fb2',
      '69a96dd62f9fdf961f4a9fb3',
      '69a96dd62f9fdf961f4a9fb4',
      '69a96dd62f9fdf961f4a9fb5',
      '69a96dd62f9fdf961f4a9fb6',
      '69a96dd62f9fdf961f4a9fb7',
      '69a96dd62f9fdf961f4a9fb8',
      '69a96dd62f9fdf961f4a9fb9',
      '69a96dd62f9fdf961f4a9fba',
      '69a96dd62f9fdf961f4a9fbb',
      '69a96dd62f9fdf961f4a9fbc',
      '69a96dd62f9fdf961f4a9fbd',
      '69a96dd62f9fdf961f4a9fbe',
    ],
  },
  {
    name: 'Кейс «Опасная зона»',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1772889102/danger-case.png',
    price: 610,
    category: 'weapon',
    items: [
      '69a96dd62f9fdf961f4a9f99',
      '69a96dd62f9fdf961f4a9f9a',
      '69a96dd62f9fdf961f4a9f9b',
      '69a96dd62f9fdf961f4a9f9c',
      '69a96dd62f9fdf961f4a9f9d',
      '69a96dd62f9fdf961f4a9f9e',
      '69a96dd62f9fdf961f4a9f9f',
      '69a96dd62f9fdf961f4a9fa0',
      '69a96dd62f9fdf961f4a9fa1',
      '69a96dd62f9fdf961f4a9fa2',
      '69a96dd62f9fdf961f4a9fa3',
      '69a96dd62f9fdf961f4a9fa4',
      '69a96dd62f9fdf961f4a9fa5',
      '69a96dd62f9fdf961f4a9fa6',
      '69a96dd62f9fdf961f4a9fa7',
      '69a96dd62f9fdf961f4a9fa8',
      '69a96dd62f9fdf961f4a9fa9',
      '69a96dd62f9fdf961f4a9faa',
      '69a96dd62f9fdf961f4a9fab',
      '69a96dd62f9fdf961f4a9fac',
      '69a96dd62f9fdf961f4a9fad',
      '69a96dd62f9fdf961f4a9fae',
      '69a96dd62f9fdf961f4a9faf',
      '69a96dd62f9fdf961f4a9fb0',
      '69a96dd62f9fdf961f4a9fb1',
      '69a96dd62f9fdf961f4a9fb2',
      '69a96dd62f9fdf961f4a9fb3',
      '69a96dd62f9fdf961f4a9fb4',
      '69a96dd62f9fdf961f4a9fb5',
      '69a96dd62f9fdf961f4a9fb6',
      '69a96dd62f9fdf961f4a9fb7',
      '69a96dd62f9fdf961f4a9fb8',
      '69a96dd62f9fdf961f4a9fb9',
      '69a96dd62f9fdf961f4a9fba',
      '69a96dd62f9fdf961f4a9fbb',
      '69a96dd62f9fdf961f4a9fbc',
      '69a96dd62f9fdf961f4a9fbd',
      '69a96dd62f9fdf961f4a9fbe',
    ],
  },
  {
    name: 'Кейс «Револьвер»',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1772889102/revolver-case.png',
    price: 290,
    category: 'weapon',
    items: [
      '69a96dd62f9fdf961f4a9f99',
      '69a96dd62f9fdf961f4a9f9a',
      '69a96dd62f9fdf961f4a9f9b',
      '69a96dd62f9fdf961f4a9f9c',
      '69a96dd62f9fdf961f4a9f9d',
      '69a96dd62f9fdf961f4a9f9e',
      '69a96dd62f9fdf961f4a9f9f',
      '69a96dd62f9fdf961f4a9fa0',
      '69a96dd62f9fdf961f4a9fa1',
      '69a96dd62f9fdf961f4a9fa2',
      '69a96dd62f9fdf961f4a9fa3',
      '69a96dd62f9fdf961f4a9fa4',
      '69a96dd62f9fdf961f4a9fa5',
      '69a96dd62f9fdf961f4a9fa6',
      '69a96dd62f9fdf961f4a9fa7',
      '69a96dd62f9fdf961f4a9fa8',
      '69a96dd62f9fdf961f4a9fa9',
      '69a96dd62f9fdf961f4a9faa',
      '69a96dd62f9fdf961f4a9fab',
      '69a96dd62f9fdf961f4a9fac',
      '69a96dd62f9fdf961f4a9fad',
      '69a96dd62f9fdf961f4a9fae',
      '69a96dd62f9fdf961f4a9faf',
      '69a96dd62f9fdf961f4a9fb0',
      '69a96dd62f9fdf961f4a9fb1',
      '69a96dd62f9fdf961f4a9fb2',
      '69a96dd62f9fdf961f4a9fb3',
      '69a96dd62f9fdf961f4a9fb4',
      '69a96dd62f9fdf961f4a9fb5',
      '69a96dd62f9fdf961f4a9fb6',
      '69a96dd62f9fdf961f4a9fb7',
      '69a96dd62f9fdf961f4a9fb8',
      '69a96dd62f9fdf961f4a9fb9',
      '69a96dd62f9fdf961f4a9fba',
      '69a96dd62f9fdf961f4a9fbb',
      '69a96dd62f9fdf961f4a9fbc',
      '69a96dd62f9fdf961f4a9fbd',
      '69a96dd62f9fdf961f4a9fbe',
    ],
  },
  {
    name: 'Кейс «Снежная слепота»',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1772889102/snow-case.png',
    price: 530,
    category: 'operation',
    items: [
      '69a96dd62f9fdf961f4a9f99',
      '69a96dd62f9fdf961f4a9f9a',
      '69a96dd62f9fdf961f4a9f9b',
      '69a96dd62f9fdf961f4a9f9c',
      '69a96dd62f9fdf961f4a9f9d',
      '69a96dd62f9fdf961f4a9f9e',
      '69a96dd62f9fdf961f4a9f9f',
      '69a96dd62f9fdf961f4a9fa0',
      '69a96dd62f9fdf961f4a9fa1',
      '69a96dd62f9fdf961f4a9fa2',
      '69a96dd62f9fdf961f4a9fa3',
      '69a96dd62f9fdf961f4a9fa4',
      '69a96dd62f9fdf961f4a9fa5',
      '69a96dd62f9fdf961f4a9fa6',
      '69a96dd62f9fdf961f4a9fa7',
      '69a96dd62f9fdf961f4a9fa8',
      '69a96dd62f9fdf961f4a9fa9',
      '69a96dd62f9fdf961f4a9faa',
      '69a96dd62f9fdf961f4a9fab',
      '69a96dd62f9fdf961f4a9fac',
      '69a96dd62f9fdf961f4a9fad',
      '69a96dd62f9fdf961f4a9fae',
      '69a96dd62f9fdf961f4a9faf',
      '69a96dd62f9fdf961f4a9fb0',
      '69a96dd62f9fdf961f4a9fb1',
      '69a96dd62f9fdf961f4a9fb2',
      '69a96dd62f9fdf961f4a9fb3',
      '69a96dd62f9fdf961f4a9fb4',
      '69a96dd62f9fdf961f4a9fb5',
      '69a96dd62f9fdf961f4a9fb6',
      '69a96dd62f9fdf961f4a9fb7',
      '69a96dd62f9fdf961f4a9fb8',
      '69a96dd62f9fdf961f4a9fb9',
      '69a96dd62f9fdf961f4a9fba',
      '69a96dd62f9fdf961f4a9fbb',
      '69a96dd62f9fdf961f4a9fbc',
      '69a96dd62f9fdf961f4a9fbd',
      '69a96dd62f9fdf961f4a9fbe',
    ],
  },
  {
    name: 'Кейс «Контроль»',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1772889102/control-case.png',
    price: 740,
    category: 'collection',
    items: [
      '69a96dd62f9fdf961f4a9f99',
      '69a96dd62f9fdf961f4a9f9a',
      '69a96dd62f9fdf961f4a9f9b',
      '69a96dd62f9fdf961f4a9f9c',
      '69a96dd62f9fdf961f4a9f9d',
      '69a96dd62f9fdf961f4a9f9e',
      '69a96dd62f9fdf961f4a9f9f',
      '69a96dd62f9fdf961f4a9fa0',
      '69a96dd62f9fdf961f4a9fa1',
      '69a96dd62f9fdf961f4a9fa2',
      '69a96dd62f9fdf961f4a9fa3',
      '69a96dd62f9fdf961f4a9fa4',
      '69a96dd62f9fdf961f4a9fa5',
      '69a96dd62f9fdf961f4a9fa6',
      '69a96dd62f9fdf961f4a9fa7',
      '69a96dd62f9fdf961f4a9fa8',
      '69a96dd62f9fdf961f4a9fa9',
      '69a96dd62f9fdf961f4a9faa',
      '69a96dd62f9fdf961f4a9fab',
      '69a96dd62f9fdf961f4a9fac',
      '69a96dd62f9fdf961f4a9fad',
      '69a96dd62f9fdf961f4a9fae',
      '69a96dd62f9fdf961f4a9faf',
      '69a96dd62f9fdf961f4a9fb0',
      '69a96dd62f9fdf961f4a9fb1',
      '69a96dd62f9fdf961f4a9fb2',
      '69a96dd62f9fdf961f4a9fb3',
      '69a96dd62f9fdf961f4a9fb4',
      '69a96dd62f9fdf961f4a9fb5',
      '69a96dd62f9fdf961f4a9fb6',
      '69a96dd62f9fdf961f4a9fb7',
      '69a96dd62f9fdf961f4a9fb8',
      '69a96dd62f9fdf961f4a9fb9',
      '69a96dd62f9fdf961f4a9fba',
      '69a96dd62f9fdf961f4a9fbb',
      '69a96dd62f9fdf961f4a9fbc',
      '69a96dd62f9fdf961f4a9fbd',
      '69a96dd62f9fdf961f4a9fbe',
    ],
  },
  {
    name: 'Кейс «Прорыв»',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1772889102/breakthrough-case.png',
    price: 390,
    category: 'new',
    items: [
      '69a96dd62f9fdf961f4a9f99',
      '69a96dd62f9fdf961f4a9f9a',
      '69a96dd62f9fdf961f4a9f9b',
      '69a96dd62f9fdf961f4a9f9c',
      '69a96dd62f9fdf961f4a9f9d',
      '69a96dd62f9fdf961f4a9f9e',
      '69a96dd62f9fdf961f4a9f9f',
      '69a96dd62f9fdf961f4a9fa0',
      '69a96dd62f9fdf961f4a9fa1',
      '69a96dd62f9fdf961f4a9fa2',
      '69a96dd62f9fdf961f4a9fa3',
      '69a96dd62f9fdf961f4a9fa4',
      '69a96dd62f9fdf961f4a9fa5',
      '69a96dd62f9fdf961f4a9fa6',
      '69a96dd62f9fdf961f4a9fa7',
      '69a96dd62f9fdf961f4a9fa8',
      '69a96dd62f9fdf961f4a9fa9',
      '69a96dd62f9fdf961f4a9faa',
      '69a96dd62f9fdf961f4a9fab',
      '69a96dd62f9fdf961f4a9fac',
      '69a96dd62f9fdf961f4a9fad',
      '69a96dd62f9fdf961f4a9fae',
      '69a96dd62f9fdf961f4a9faf',
      '69a96dd62f9fdf961f4a9fb0',
      '69a96dd62f9fdf961f4a9fb1',
      '69a96dd62f9fdf961f4a9fb2',
      '69a96dd62f9fdf961f4a9fb3',
      '69a96dd62f9fdf961f4a9fb4',
      '69a96dd62f9fdf961f4a9fb5',
      '69a96dd62f9fdf961f4a9fb6',
      '69a96dd62f9fdf961f4a9fb7',
      '69a96dd62f9fdf961f4a9fb8',
      '69a96dd62f9fdf961f4a9fb9',
      '69a96dd62f9fdf961f4a9fba',
      '69a96dd62f9fdf961f4a9fbb',
      '69a96dd62f9fdf961f4a9fbc',
      '69a96dd62f9fdf961f4a9fbd',
      '69a96dd62f9fdf961f4a9fbe',
    ],
  },
  {
    name: 'Кейс «Экосистема»',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1772889102/eco-case.png',
    price: 460,
    category: 'collection',
    items: [
      '69a96dd62f9fdf961f4a9f99',
      '69a96dd62f9fdf961f4a9f9a',
      '69a96dd62f9fdf961f4a9f9b',
      '69a96dd62f9fdf961f4a9f9c',
      '69a96dd62f9fdf961f4a9f9d',
      '69a96dd62f9fdf961f4a9f9e',
      '69a96dd62f9fdf961f4a9f9f',
      '69a96dd62f9fdf961f4a9fa0',
      '69a96dd62f9fdf961f4a9fa1',
      '69a96dd62f9fdf961f4a9fa2',
      '69a96dd62f9fdf961f4a9fa3',
      '69a96dd62f9fdf961f4a9fa4',
      '69a96dd62f9fdf961f4a9fa5',
      '69a96dd62f9fdf961f4a9fa6',
      '69a96dd62f9fdf961f4a9fa7',
      '69a96dd62f9fdf961f4a9fa8',
      '69a96dd62f9fdf961f4a9fa9',
      '69a96dd62f9fdf961f4a9faa',
      '69a96dd62f9fdf961f4a9fab',
      '69a96dd62f9fdf961f4a9fac',
      '69a96dd62f9fdf961f4a9fad',
      '69a96dd62f9fdf961f4a9fae',
      '69a96dd62f9fdf961f4a9faf',
      '69a96dd62f9fdf961f4a9fb0',
      '69a96dd62f9fdf961f4a9fb1',
      '69a96dd62f9fdf961f4a9fb2',
      '69a96dd62f9fdf961f4a9fb3',
      '69a96dd62f9fdf961f4a9fb4',
      '69a96dd62f9fdf961f4a9fb5',
      '69a96dd62f9fdf961f4a9fb6',
      '69a96dd62f9fdf961f4a9fb7',
      '69a96dd62f9fdf961f4a9fb8',
      '69a96dd62f9fdf961f4a9fb9',
      '69a96dd62f9fdf961f4a9fba',
      '69a96dd62f9fdf961f4a9fbb',
      '69a96dd62f9fdf961f4a9fbc',
      '69a96dd62f9fdf961f4a9fbd',
      '69a96dd62f9fdf961f4a9fbe',
    ],
  },
  {
    name: 'Кейс «Гроза»',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1772889102/storm-case.png',
    price: 820,
    category: 'weapon',
    items: [
      '69a96dd62f9fdf961f4a9f99',
      '69a96dd62f9fdf961f4a9f9a',
      '69a96dd62f9fdf961f4a9f9b',
      '69a96dd62f9fdf961f4a9f9c',
      '69a96dd62f9fdf961f4a9f9d',
      '69a96dd62f9fdf961f4a9f9e',
      '69a96dd62f9fdf961f4a9f9f',
      '69a96dd62f9fdf961f4a9fa0',
      '69a96dd62f9fdf961f4a9fa1',
      '69a96dd62f9fdf961f4a9fa2',
      '69a96dd62f9fdf961f4a9fa3',
      '69a96dd62f9fdf961f4a9fa4',
      '69a96dd62f9fdf961f4a9fa5',
      '69a96dd62f9fdf961f4a9fa6',
      '69a96dd62f9fdf961f4a9fa7',
      '69a96dd62f9fdf961f4a9fa8',
      '69a96dd62f9fdf961f4a9fa9',
      '69a96dd62f9fdf961f4a9faa',
      '69a96dd62f9fdf961f4a9fab',
      '69a96dd62f9fdf961f4a9fac',
      '69a96dd62f9fdf961f4a9fad',
      '69a96dd62f9fdf961f4a9fae',
      '69a96dd62f9fdf961f4a9faf',
      '69a96dd62f9fdf961f4a9fb0',
      '69a96dd62f9fdf961f4a9fb1',
      '69a96dd62f9fdf961f4a9fb2',
      '69a96dd62f9fdf961f4a9fb3',
      '69a96dd62f9fdf961f4a9fb4',
      '69a96dd62f9fdf961f4a9fb5',
      '69a96dd62f9fdf961f4a9fb6',
      '69a96dd62f9fdf961f4a9fb7',
      '69a96dd62f9fdf961f4a9fb8',
      '69a96dd62f9fdf961f4a9fb9',
      '69a96dd62f9fdf961f4a9fba',
      '69a96dd62f9fdf961f4a9fbb',
      '69a96dd62f9fdf961f4a9fbc',
      '69a96dd62f9fdf961f4a9fbd',
      '69a96dd62f9fdf961f4a9fbe',
    ],
  },
  {
    name: 'Кейс «Киберспорт»',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1772889102/esports-case.png',
    price: 1050,
    category: 'operation',
    items: [
      '69a96dd62f9fdf961f4a9f99',
      '69a96dd62f9fdf961f4a9f9a',
      '69a96dd62f9fdf961f4a9f9b',
      '69a96dd62f9fdf961f4a9f9c',
      '69a96dd62f9fdf961f4a9f9d',
      '69a96dd62f9fdf961f4a9f9e',
      '69a96dd62f9fdf961f4a9f9f',
      '69a96dd62f9fdf961f4a9fa0',
      '69a96dd62f9fdf961f4a9fa1',
      '69a96dd62f9fdf961f4a9fa2',
      '69a96dd62f9fdf961f4a9fa3',
      '69a96dd62f9fdf961f4a9fa4',
      '69a96dd62f9fdf961f4a9fa5',
      '69a96dd62f9fdf961f4a9fa6',
      '69a96dd62f9fdf961f4a9fa7',
      '69a96dd62f9fdf961f4a9fa8',
      '69a96dd62f9fdf961f4a9fa9',
      '69a96dd62f9fdf961f4a9faa',
      '69a96dd62f9fdf961f4a9fab',
      '69a96dd62f9fdf961f4a9fac',
      '69a96dd62f9fdf961f4a9fad',
      '69a96dd62f9fdf961f4a9fae',
      '69a96dd62f9fdf961f4a9faf',
      '69a96dd62f9fdf961f4a9fb0',
      '69a96dd62f9fdf961f4a9fb1',
      '69a96dd62f9fdf961f4a9fb2',
      '69a96dd62f9fdf961f4a9fb3',
      '69a96dd62f9fdf961f4a9fb4',
      '69a96dd62f9fdf961f4a9fb5',
      '69a96dd62f9fdf961f4a9fb6',
      '69a96dd62f9fdf961f4a9fb7',
      '69a96dd62f9fdf961f4a9fb8',
      '69a96dd62f9fdf961f4a9fb9',
      '69a96dd62f9fdf961f4a9fba',
      '69a96dd62f9fdf961f4a9fbb',
      '69a96dd62f9fdf961f4a9fbc',
      '69a96dd62f9fdf961f4a9fbd',
      '69a96dd62f9fdf961f4a9fbe',
    ],
  },
  {
    name: 'Кейс «Ночная операция»',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1772889102/night-case.png',
    price: 570,
    category: 'operation',
    items: [
      '69a96dd62f9fdf961f4a9f99',
      '69a96dd62f9fdf961f4a9f9a',
      '69a96dd62f9fdf961f4a9f9b',
      '69a96dd62f9fdf961f4a9f9c',
      '69a96dd62f9fdf961f4a9f9d',
      '69a96dd62f9fdf961f4a9f9e',
      '69a96dd62f9fdf961f4a9f9f',
      '69a96dd62f9fdf961f4a9fa0',
      '69a96dd62f9fdf961f4a9fa1',
      '69a96dd62f9fdf961f4a9fa2',
      '69a96dd62f9fdf961f4a9fa3',
      '69a96dd62f9fdf961f4a9fa4',
      '69a96dd62f9fdf961f4a9fa5',
      '69a96dd62f9fdf961f4a9fa6',
      '69a96dd62f9fdf961f4a9fa7',
      '69a96dd62f9fdf961f4a9fa8',
      '69a96dd62f9fdf961f4a9fa9',
      '69a96dd62f9fdf961f4a9faa',
      '69a96dd62f9fdf961f4a9fab',
      '69a96dd62f9fdf961f4a9fac',
      '69a96dd62f9fdf961f4a9fad',
      '69a96dd62f9fdf961f4a9fae',
      '69a96dd62f9fdf961f4a9faf',
      '69a96dd62f9fdf961f4a9fb0',
      '69a96dd62f9fdf961f4a9fb1',
      '69a96dd62f9fdf961f4a9fb2',
      '69a96dd62f9fdf961f4a9fb3',
      '69a96dd62f9fdf961f4a9fb4',
      '69a96dd62f9fdf961f4a9fb5',
      '69a96dd62f9fdf961f4a9fb6',
      '69a96dd62f9fdf961f4a9fb7',
      '69a96dd62f9fdf961f4a9fb8',
      '69a96dd62f9fdf961f4a9fb9',
      '69a96dd62f9fdf961f4a9fba',
      '69a96dd62f9fdf961f4a9fbb',
      '69a96dd62f9fdf961f4a9fbc',
      '69a96dd62f9fdf961f4a9fbd',
      '69a96dd62f9fdf961f4a9fbe',
    ],
  },
  {
    name: 'Кейс «Шёпот»',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1772889102/whisper-case.png',
    price: 330,
    category: 'new',
    items: [
      '69a96dd62f9fdf961f4a9f99',
      '69a96dd62f9fdf961f4a9f9a',
      '69a96dd62f9fdf961f4a9f9b',
      '69a96dd62f9fdf961f4a9f9c',
      '69a96dd62f9fdf961f4a9f9d',
      '69a96dd62f9fdf961f4a9f9e',
      '69a96dd62f9fdf961f4a9f9f',
      '69a96dd62f9fdf961f4a9fa0',
      '69a96dd62f9fdf961f4a9fa1',
      '69a96dd62f9fdf961f4a9fa2',
      '69a96dd62f9fdf961f4a9fa3',
      '69a96dd62f9fdf961f4a9fa4',
      '69a96dd62f9fdf961f4a9fa5',
      '69a96dd62f9fdf961f4a9fa6',
      '69a96dd62f9fdf961f4a9fa7',
      '69a96dd62f9fdf961f4a9fa8',
      '69a96dd62f9fdf961f4a9fa9',
      '69a96dd62f9fdf961f4a9faa',
      '69a96dd62f9fdf961f4a9fab',
      '69a96dd62f9fdf961f4a9fac',
      '69a96dd62f9fdf961f4a9fad',
      '69a96dd62f9fdf961f4a9fae',
      '69a96dd62f9fdf961f4a9faf',
      '69a96dd62f9fdf961f4a9fb0',
      '69a96dd62f9fdf961f4a9fb1',
      '69a96dd62f9fdf961f4a9fb2',
      '69a96dd62f9fdf961f4a9fb3',
      '69a96dd62f9fdf961f4a9fb4',
      '69a96dd62f9fdf961f4a9fb5',
      '69a96dd62f9fdf961f4a9fb6',
      '69a96dd62f9fdf961f4a9fb7',
      '69a96dd62f9fdf961f4a9fb8',
      '69a96dd62f9fdf961f4a9fb9',
      '69a96dd62f9fdf961f4a9fba',
      '69a96dd62f9fdf961f4a9fbb',
      '69a96dd62f9fdf961f4a9fbc',
      '69a96dd62f9fdf961f4a9fbd',
      '69a96dd62f9fdf961f4a9fbe',
    ],
  },
  {
    name: 'Кейс «Классика»',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1772889102/classic-case.png',
    price: 120,
    category: 'weapon',
    items: [
      '69a96dd62f9fdf961f4a9f99',
      '69a96dd62f9fdf961f4a9f9a',
      '69a96dd62f9fdf961f4a9f9b',
      '69a96dd62f9fdf961f4a9f9c',
      '69a96dd62f9fdf961f4a9f9d',
      '69a96dd62f9fdf961f4a9f9e',
      '69a96dd62f9fdf961f4a9f9f',
      '69a96dd62f9fdf961f4a9fa0',
      '69a96dd62f9fdf961f4a9fa1',
      '69a96dd62f9fdf961f4a9fa2',
      '69a96dd62f9fdf961f4a9fa3',
      '69a96dd62f9fdf961f4a9fa4',
      '69a96dd62f9fdf961f4a9fa5',
      '69a96dd62f9fdf961f4a9fa6',
      '69a96dd62f9fdf961f4a9fa7',
      '69a96dd62f9fdf961f4a9fa8',
      '69a96dd62f9fdf961f4a9fa9',
      '69a96dd62f9fdf961f4a9faa',
      '69a96dd62f9fdf961f4a9fab',
      '69a96dd62f9fdf961f4a9fac',
      '69a96dd62f9fdf961f4a9fad',
      '69a96dd62f9fdf961f4a9fae',
      '69a96dd62f9fdf961f4a9faf',
      '69a96dd62f9fdf961f4a9fb0',
      '69a96dd62f9fdf961f4a9fb1',
      '69a96dd62f9fdf961f4a9fb2',
      '69a96dd62f9fdf961f4a9fb3',
      '69a96dd62f9fdf961f4a9fb4',
      '69a96dd62f9fdf961f4a9fb5',
      '69a96dd62f9fdf961f4a9fb6',
      '69a96dd62f9fdf961f4a9fb7',
      '69a96dd62f9fdf961f4a9fb8',
      '69a96dd62f9fdf961f4a9fb9',
      '69a96dd62f9fdf961f4a9fba',
      '69a96dd62f9fdf961f4a9fbb',
      '69a96dd62f9fdf961f4a9fbc',
      '69a96dd62f9fdf961f4a9fbd',
      '69a96dd62f9fdf961f4a9fbe',
    ],
  },
  {
    name: 'Премиум кейс',
    image:
      'https://res.cloudinary.com/daqnu2set/image/upload/v1772889102/premium-case.png',
    price: 1500,
    category: 'legendary',
    items: [
      '69a96dd62f9fdf961f4a9f99',
      '69a96dd62f9fdf961f4a9f9a',
      '69a96dd62f9fdf961f4a9f9b',
      '69a96dd62f9fdf961f4a9f9c',
      '69a96dd62f9fdf961f4a9f9d',
      '69a96dd62f9fdf961f4a9f9e',
      '69a96dd62f9fdf961f4a9f9f',
      '69a96dd62f9fdf961f4a9fa0',
      '69a96dd62f9fdf961f4a9fa1',
      '69a96dd62f9fdf961f4a9fa2',
      '69a96dd62f9fdf961f4a9fa3',
      '69a96dd62f9fdf961f4a9fa4',
      '69a96dd62f9fdf961f4a9fa5',
      '69a96dd62f9fdf961f4a9fa6',
      '69a96dd62f9fdf961f4a9fa7',
      '69a96dd62f9fdf961f4a9fa8',
      '69a96dd62f9fdf961f4a9fa9',
      '69a96dd62f9fdf961f4a9faa',
      '69a96dd62f9fdf961f4a9fab',
      '69a96dd62f9fdf961f4a9fac',
      '69a96dd62f9fdf961f4a9fad',
      '69a96dd62f9fdf961f4a9fae',
      '69a96dd62f9fdf961f4a9faf',
      '69a96dd62f9fdf961f4a9fb0',
      '69a96dd62f9fdf961f4a9fb1',
      '69a96dd62f9fdf961f4a9fb2',
      '69a96dd62f9fdf961f4a9fb3',
      '69a96dd62f9fdf961f4a9fb4',
      '69a96dd62f9fdf961f4a9fb5',
      '69a96dd62f9fdf961f4a9fb6',
      '69a96dd62f9fdf961f4a9fb7',
      '69a96dd62f9fdf961f4a9fb8',
      '69a96dd62f9fdf961f4a9fb9',
      '69a96dd62f9fdf961f4a9fba',
      '69a96dd62f9fdf961f4a9fbb',
      '69a96dd62f9fdf961f4a9fbc',
      '69a96dd62f9fdf961f4a9fbd',
      '69a96dd62f9fdf961f4a9fbe',
    ],
  },
];
export async function seedItems() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB подключен');
    const count = await Items.countDocuments();
    console.log(`Текущих предметов: ${count} CASE`);
    if (count === 0) {
      const result = await Items.insertMany(newSkin);
    } else {
    }
  } catch (error) {
    console.error('❌ Ошибка:', error);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Отключено от MongoDB');
  }
}
export async function createCase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Создание кейса:`);
    const count = await Case.countDocuments();

    //console.log(findItems.map((item) => item._id));
    if (count === 0) {
      await Case.insertMany(caseItems);
      console.log('Кейсы добавлены');
    }
  } catch (error) {
    console.error('❌ Ошибка:', error);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Отключено от MongoDB Создание кейсов');
  }
}
