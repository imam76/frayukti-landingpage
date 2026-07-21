import { useEffect, useMemo, useState } from 'react'
import { Button, Checkbox, Collapse, Tag } from 'antd'
import {
  AppstoreOutlined,
  ArrowDownOutlined,
  ArrowRightOutlined,
  AuditOutlined,
  BranchesOutlined,
  CheckOutlined,
  CloseOutlined,
  LineChartOutlined,
  MenuOutlined,
  MinusOutlined,
  PlusOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import logo from './assets/frayukti-box-f-logo-transparant.png'
import laptopMockup from './assets/mokup-frayukti-laptop.png'
import tabletMockup from './assets/mokup-frayukti-tablet.png'
import './App.css'

const industries = [
  'Ritel',
  'Resto',
  'HR',
  'Koperasi',
  'Akuntansi',
  'Produksi',
]

const benefits = [
  {
    number: '01',
    title: 'Mulai secukupnya',
    text: 'Aktifkan modul yang benar-benar dibutuhkan hari ini. Tidak ada sistem berlebih yang menghambat tim.',
    icon: <AppstoreOutlined />,
    color: 'blue',
  },
  {
    number: '02',
    title: 'Satu alur kerja',
    text: 'Data operasional bergerak dari transaksi menuju pembukuan dan laporan tanpa berpindah-pindah tempat.',
    icon: <BranchesOutlined />,
    color: 'cyan',
  },
  {
    number: '03',
    title: 'Keputusan lebih jernih',
    text: 'Lihat angka penting dalam struktur yang konsisten, agar tindakan berikutnya terasa lebih pasti.',
    icon: <LineChartOutlined />,
    color: 'green',
  },
  {
    number: '04',
    title: 'Tumbuh tanpa mengulang',
    text: 'Tambahkan fungsi, pengguna, dan unit kerja saat bisnis berkembang—tanpa menyusun sistem dari awal.',
    icon: <SafetyCertificateOutlined />,
    color: 'ink',
  },
]

const moduleCatalog = [
  {
    key: 'transaksi',
    label: 'POS & Transaksi',
    short: 'Transaksi',
    description:
      'Kelola penjualan dan pembelian dari permintaan hingga pembayaran.',
    groups: [
      {
        title: 'Penjualan',
        items: [
          { id: 'pos', label: 'POS', price: 99000 },
          { id: 'sales-quotation', label: 'Sales Quotation', price: 59000 },
          { id: 'sales-order', label: 'Sales Order', price: 69000 },
          { id: 'sales-delivery', label: 'Sales Delivery', price: 59000 },
          { id: 'sales-invoice', label: 'Sales Invoice', price: 79000 },
          { id: 'sales-return', label: 'Sales Return', price: 49000 },
        ],
      },
      {
        title: 'Pembelian',
        items: [
          { id: 'purchase-request', label: 'Purchase Request', price: 49000 },
          { id: 'request-quotation', label: 'Request for Quotation', price: 59000 },
          { id: 'purchase-order', label: 'Purchase Order', price: 79000 },
          { id: 'goods-receipt', label: 'Goods Receipt', price: 69000 },
          { id: 'purchase-invoice', label: 'Purchase Invoice', price: 79000 },
          { id: 'purchase-return', label: 'Purchase Return', price: 49000 },
          {
            id: 'provisional-price',
            label: 'Penerimaan dengan Harga Sementara',
            price: 39000,
          },
          { id: 'account-payable', label: 'Hutang Usaha', price: 99000 },
        ],
      },
    ],
  },
  {
    key: 'masterdata',
    label: 'Master Data',
    short: 'Master Data',
    description:
      'Satukan referensi operasional agar setiap transaksi tetap konsisten.',
    groups: [
      {
        title: 'Data Operasional',
        items: [
          { id: 'product', label: 'Produk', price: 59000 },
          { id: 'warehouse', label: 'Gudang', price: 79000 },
          { id: 'project', label: 'Proyek', price: 69000 },
          { id: 'department', label: 'Departemen', price: 39000 },
          {
            id: 'unit-conversion',
            label: 'Unit & Konversi Unit',
            price: 39000,
          },
          { id: 'currency', label: 'Mata Uang', price: 39000 },
          { id: 'payment-method', label: 'Metode Pembayaran', price: 29000 },
          { id: 'contact', label: 'Kontak', price: 39000 },
          { id: 'discount-promo', label: 'Diskon & Promosi', price: 69000 },
          { id: 'production', label: 'Produksi', price: 149000 },
          {
            id: 'production-formula',
            label: 'Formula Produksi',
            price: 89000,
          },
          { id: 'tax', label: 'Pajak', price: 49000 },
        ],
      },
    ],
  },
  {
    key: 'hr',
    label: 'Human Resources',
    short: 'HR',
    description: 'Atur karyawan, jadwal, akses, dan penggajian dalam satu alur.',
    groups: [
      {
        title: 'Tim & Akses',
        items: [
          { id: 'area', label: 'Area', price: 39000 },
          { id: 'employee', label: 'Karyawan', price: 79000 },
          { id: 'schedule', label: 'Jadwal', price: 69000 },
          {
            id: 'role-permission',
            label: 'Peran & Hak Akses',
            price: 59000,
          },
          { id: 'payroll', label: 'Payroll', price: 149000 },
        ],
      },
    ],
  },
  {
    key: 'pembukuan',
    label: 'Pembukuan',
    short: 'Pembukuan',
    description:
      'Ubah aktivitas harian menjadi catatan keuangan yang rapi dan terbaca.',
    groups: [
      {
        title: 'Keuangan',
        items: [
          { id: 'cash-bank', label: 'Cash & Bank', price: 99000 },
          {
            id: 'cash-bank-reconciliation',
            label: 'Rekonsiliasi Cash & Bank',
            price: 89000,
          },
          { id: 'account-receivable', label: 'Piutang Usaha', price: 99000 },
          { id: 'account-payable', label: 'Hutang Usaha', price: 99000 },
          { id: 'payroll', label: 'Payroll', price: 149000 },
          { id: 'chart-account', label: 'Daftar Akun', price: 49000 },
          { id: 'opening-balance', label: 'Saldo Awal', price: 39000 },
          { id: 'general-ledger', label: 'General Ledger', price: 129000 },
        ],
      },
    ],
  },
  {
    key: 'koperasi',
    label: 'Koperasi',
    short: 'Koperasi',
    description:
      'Kelola anggota, simpanan, pinjaman, angsuran, dan penagihan.',
    groups: [
      {
        title: 'Keanggotaan & Pinjaman',
        items: [
          { id: 'member', label: 'Anggota', price: 69000 },
          { id: 'saving', label: 'Simpanan', price: 79000 },
          { id: 'loan', label: 'Pinjaman', price: 99000 },
          {
            id: 'loan-opening-balance',
            label: 'Saldo Awal Pinjaman',
            price: 49000,
          },
          { id: 'installment', label: 'Angsuran', price: 79000 },
          {
            id: 'billing-deposit',
            label: 'Setoran Penagihan',
            price: 59000,
          },
          {
            id: 'collector-deposit',
            label: 'Setoran Kolektor',
            price: 59000,
          },
          { id: 'cooperative-report', label: 'Laporan Koperasi', price: 89000 },
        ],
      },
    ],
  },
  {
    key: 'laporan',
    label: 'Daftar Menu Laporan',
    short: 'Laporan',
    description:
      'Baca kinerja bisnis tanpa merangkai data secara manual.',
    groups: [
      {
        title: 'Laporan Bisnis',
        items: [
          { id: 'report-pos-sales', label: 'Penjualan POS', price: 39000 },
          { id: 'report-deposit', label: 'Setoran', price: 29000 },
          { id: 'report-pos-detail', label: 'Detail POS', price: 29000 },
          {
            id: 'report-purchase',
            label: 'Laporan Pembelian',
            price: 39000,
          },
          { id: 'report-income', label: 'Laporan Pemasukan', price: 39000 },
          {
            id: 'report-expense',
            label: 'Laporan Pengeluaran',
            price: 39000,
          },
          { id: 'report-cashflow', label: 'Arus Kas', price: 59000 },
          { id: 'report-payroll', label: 'Penggajian', price: 39000 },
          { id: 'report-profit-loss', label: 'Laba Rugi', price: 59000 },
          { id: 'report-balance', label: 'Neraca', price: 59000 },
          { id: 'report-ledger', label: 'Buku Besar', price: 59000 },
          {
            id: 'report-receivable-payable',
            label: 'Piutang & Hutang',
            price: 59000,
          },
          { id: 'report-stock-card', label: 'Kartu Stok', price: 49000 },
        ],
      },
    ],
  },
]

const allModules = moduleCatalog.flatMap((category) =>
  category.groups.flatMap((group) => group.items),
)

const bundledModuleCatalog = moduleCatalog.filter(
  (category) => category.key !== 'koperasi',
)
const bundledModuleIds = [
  ...new Set(
    bundledModuleCatalog.flatMap((category) =>
      category.groups.flatMap((group) =>
        group.items.map((module) => module.id),
      ),
    ),
  ),
]
const moduleById = new Map(allModules.map((module) => [module.id, module]))
const allModuleIds = [...new Set(allModules.map((module) => module.id))]

const packageDefaults = {
  umkm: [
    'pos',
    'sales-invoice',
    'purchase-order',
    'product',
    'warehouse',
    'cash-bank',
    'report-profit-loss',
    'report-stock-card',
  ],
  pro: [
    'pos',
    'sales-quotation',
    'sales-order',
    'sales-delivery',
    'sales-invoice',
    'sales-return',
    'purchase-request',
    'purchase-order',
    'goods-receipt',
    'purchase-invoice',
    'product',
    'warehouse',
    'contact',
    'discount-promo',
    'production',
    'employee',
    'schedule',
    'role-permission',
    'payroll',
    'cash-bank',
    'cash-bank-reconciliation',
    'account-receivable',
    'account-payable',
    'chart-account',
    'general-ledger',
    'report-pos-sales',
    'report-purchase',
    'report-cashflow',
    'report-profit-loss',
    'report-balance',
    'report-stock-card',
  ],
  enterprise: bundledModuleIds,
}

const plans = [
  {
    key: 'umkm',
    name: 'UMKM',
    index: '01',
    kicker: 'Fondasi operasional',
    description:
      'Untuk usaha yang ingin transaksi, stok, pembukuan dasar, dan laporan harian lebih tertib.',
    price: 850000,
    features: [
      '8 modul inti: POS, stok & kas',
      'Pembelian & laporan esensial',
      'Hingga 3 pengguna',
      '1 cabang usaha',
    ],
    action: 'Beli Paket UMKM',
  },
  {
    key: 'pro',
    name: 'Pro',
    index: '02',
    kicker: 'Kontrol lintas fungsi',
    description:
      'Untuk tim berkembang yang membutuhkan penjualan, pembelian, SDM, dan keuangan lebih menyeluruh.',
    price: 1850000,
    features: [
      '31 modul terhubung',
      'Penjualan lengkap & pembelian inti',
      'HR, payroll & pembukuan',
      'Hingga 15 pengguna',
      'Hingga 5 cabang',
    ],
    action: 'Beli Paket Pro',
    recommended: true,
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    index: '03',
    kicker: 'Kendali operasional menyeluruh',
    description:
      'Untuk organisasi dengan proses kritis yang membutuhkan sistem khusus—dirancang mengikuti alur kerja, kontrol, dan target bisnis Anda.',
    price: null,
    features: [
      'Perdagangan, ritel, dan distribusi dengan alur pencatatan lintas transaksi yang lebih kompleks',
      'Manufaktur dengan tahapan produksi detail yang termonitor dari awal hingga akhir',
      'Yayasan dan nonprofit dengan laporan transparan serta aktivitas keuangan real-time',
      'Kontraktor dan usaha lain yang membutuhkan proses input-output lebih kompleks',
    ],
    action: 'Konsultasikan Enterprise',
  },
]

const visiblePlans = plans

const comparisonRows = [
  {
    label: 'Cocok untuk',
    umkm: 'Operasi ringkas',
    pro: 'Tim berkembang',
    enterprise: 'Organisasi kompleks',
  },
  {
    label: 'Harga beli putus',
    umkm: 'Rp850.000',
    pro: 'Rp1.850.000',
    enterprise: 'Disusun sesuai kebutuhan',
  },
  {
    label: 'Modul termasuk',
    umkm: '8 modul',
    pro: '31 modul',
    enterprise: '50 modul',
  },
  { label: 'Pengguna', umkm: '3', pro: '15', enterprise: 'Fleksibel' },
  { label: 'Cabang', umkm: '1', pro: 'Hingga 5', enterprise: 'Multi-entitas' },
  { label: 'POS & Transaksi', umkm: 'Inti', pro: 'Lengkap', enterprise: 'Lengkap' },
  {
    label: 'Alur pembelian',
    umkm: 'Inti',
    pro: 'Terhubung',
    enterprise: 'Lengkap',
  },
  { label: 'Master Data', umkm: 'Dasar', pro: 'Operasional', enterprise: 'Lengkap' },
  { label: 'HR & Payroll', umkm: 'Add-on', pro: true, enterprise: true },
  { label: 'Pembukuan', umkm: 'Dasar', pro: true, enterprise: true },
  {
    label: 'Koperasi',
    umkm: 'Paket terpisah',
    pro: 'Paket terpisah',
    enterprise: 'Paket terpisah',
  },
  { label: 'Laporan', umkm: 'Esensial', pro: 'Bisnis', enterprise: 'Lengkap' },
  {
    label: 'Konfigurasi modul',
    umkm: 'Dapat ditambah',
    pro: 'Dapat ditambah',
    enterprise: 'Disesuaikan',
  },
  {
    label: 'Pendampingan',
    umkm: 'Panduan & pendampingan selama garansi',
    pro: 'Sesi setup & pendampingan selama garansi',
    enterprise: 'Dedicated selama garansi',
  },
]

const implementationSteps = [
  {
    number: '01',
    title: 'Pemetaan',
    text: 'Kami memahami proses, pengguna, data, dan hasil yang ingin dicapai.',
  },
  {
    number: '02',
    title: 'Konfigurasi',
    text: 'Paket, modul, master data, dan hak akses disusun sesuai alur kerja.',
  },
  {
    number: '03',
    title: 'Validasi',
    text: 'Data awal dan proses utama diuji bersama pengguna yang terlibat.',
  },
  {
    number: '04',
    title: 'Go-live',
    text: 'Tim mulai bekerja dengan sistem yang siap, lalu didampingi hingga masa garansi berakhir.',
  },
]

const faqItems = [
  {
    key: '1',
    label: 'Apakah saya harus membeli semua modul?',
    children: (
      <p>
        Tidak. Anda dapat memulai dari paket dasar dan hanya menambahkan modul
        yang relevan dengan proses bisnis saat ini.
      </p>
    ),
  },
  {
    key: '2',
    label: 'Bisakah modul ditambahkan kemudian?',
    children: (
      <p>
        Bisa. Modul tambahan juga dibeli satu kali sesuai harga yang tercantum,
        sehingga sistem dapat berkembang tanpa biaya langganan bulanan.
      </p>
    ),
  },
  {
    key: '3',
    label: 'Apakah ada biaya langganan bulanan?',
    children: (
      <p>
        Tidak. Paket Frayukti menggunakan skema beli putus dengan sekali bayar:
        UMKM Rp850.000 dan Pro Rp1.850.000.
      </p>
    ),
  },
  {
    key: '4',
    label: 'Apa yang dapat memengaruhi total pembelian?',
    children: (
      <p>
        Harga paket tetap sesuai modul bawaannya. Total hanya bertambah jika Anda
        memilih modul tambahan, migrasi data, integrasi, atau implementasi khusus.
      </p>
    ),
  },
  {
    key: '5',
    label: 'Bisakah data dari sistem lama dipindahkan?',
    children: (
      <p>
        Bisa dipertimbangkan. Metode migrasi ditentukan setelah format, kualitas,
        dan volume data lama diperiksa bersama.
      </p>
    ),
  },
  {
    key: '6',
    label: 'Apakah Frayukti hanya untuk ritel?',
    children: (
      <p>
        Tidak. Sistem modularnya dapat digunakan untuk ritel, resto, HR,
        produksi, akuntansi, koperasi, lembaga keuangan, dan model usaha lain.
      </p>
    ),
  },
  {
    key: '7',
    label: 'Bagaimana jika saya belum tahu modul yang dibutuhkan?',
    children: (
      <p>
        Mulai dari proses yang paling ingin dirapikan. Tim Frayukti dapat membantu
        memetakan modul yang cukup untuk hari ini dan siap untuk tahap berikutnya.
      </p>
    ),
  },
]

function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activePlan, setActivePlan] = useState('umkm')
  const [activeCategory, setActiveCategory] = useState('transaksi')
  const [comparePlan, setComparePlan] = useState('pro')
  const [selectedModules, setSelectedModules] = useState(
    () => new Set(packageDefaults.umkm),
  )
  const [copyMessage, setCopyMessage] = useState('')
  const [isSendingConsultation, setIsSendingConsultation] = useState(false)

  useEffect(() => {
    if (!window.location.hash) return

    const target = document.getElementById(window.location.hash.slice(1))
    if (!target) return

    const previousScrollBehavior = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = 'auto'
    target.scrollIntoView({ block: 'start' })

    const frame = window.requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = previousScrollBehavior
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  const currentPlan = plans.find((plan) => plan.key === activePlan)
  const currentCategory = moduleCatalog.find(
    (category) => category.key === activeCategory,
  )

  const includedModules = useMemo(
    () => new Set(packageDefaults[activePlan]),
    [activePlan],
  )

  const addonPrice = useMemo(
    () =>
      [...selectedModules]
        .filter((id) => !includedModules.has(id))
        .reduce((sum, id) => sum + (moduleById.get(id)?.price ?? 0), 0),
    [includedModules, selectedModules],
  )

  const hasExplicitPlanPrice = Number.isFinite(currentPlan.price)
  const purchaseTotal = hasExplicitPlanPrice
    ? currentPlan.price + addonPrice
    : null
  const purchaseTotalText = hasExplicitPlanPrice
    ? `${formatCurrency(purchaseTotal)} (sekali bayar)`
    : 'Disesuaikan setelah konsultasi'

  const changePlan = (planKey, shouldScroll = false) => {
    setActivePlan(planKey)
    setSelectedModules(new Set(packageDefaults[planKey]))

    if (shouldScroll) {
      window.requestAnimationFrame(() => {
        document.querySelector('#konsultasi')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      })
    }
  }

  const toggleModule = (moduleId) => {
    if (includedModules.has(moduleId)) return

    setSelectedModules((previous) => {
      const next = new Set(previous)
      if (next.has(moduleId)) next.delete(moduleId)
      else next.add(moduleId)
      return next
    })
  }

  const handleConsultationSummary = async (event) => {
    event.preventDefault()
    if (isSendingConsultation) return

    setIsSendingConsultation(true)
    setCopyMessage('')

    const formData = new FormData(event.currentTarget)
    const selectedNames = [...selectedModules]
      .map((id) => moduleById.get(id)?.label)
      .filter(Boolean)
      .join(', ')
    const summary = [
      'Ringkasan Konsultasi Frayukti',
      `Nama: ${formData.get('name')}`,
      `Bisnis: ${formData.get('business')}`,
      `Kontak: ${formData.get('contact')}`,
      `Bidang: ${formData.get('industry')}`,
      `Paket awal: ${currentPlan.name}`,
      `Modul aktif: ${selectedModules.size}`,
      `Pilihan modul: ${selectedNames}`,
      `Estimasi investasi: ${purchaseTotalText}`,
    ].join('\n')

    try {
      const telegramResponse = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          business: formData.get('business'),
          contact: formData.get('contact'),
          industry: formData.get('industry'),
          plan: currentPlan.name,
          moduleCount: selectedModules.size,
          modules: selectedNames,
          total: purchaseTotalText,
          pageUrl: window.location.href,
        }),
      })

      if (!telegramResponse.ok) {
        const result = await telegramResponse.json().catch(() => ({}))
        throw new Error(result.error || 'Pesan belum dapat dikirim')
      }

      try {
        await navigator.clipboard.writeText(summary)
        setCopyMessage(
          'Ringkasan sudah dikirim ke tim Frayukti dan disalin untuk Anda.',
        )
      } catch {
        window.prompt('Ringkasan sudah dikirim. Salin juga ringkasan berikut:', summary)
        setCopyMessage('Ringkasan sudah dikirim ke tim Frayukti.')
      }
    } catch (error) {
      try {
        await navigator.clipboard.writeText(summary)
        setCopyMessage(
          `${error.message}. Ringkasan sudah disalin; silakan coba kirim kembali.`,
        )
      } catch {
        window.prompt('Pengiriman belum berhasil. Salin ringkasan berikut:', summary)
        setCopyMessage(`${error.message}. Silakan coba kembali.`)
      }
    } finally {
      setIsSendingConsultation(false)
    }
  }

  const renderComparisonValue = (value) => {
    if (value === true) {
      return (
        <span className="compare-check" aria-label="Termasuk">
          <CheckOutlined />
        </span>
      )
    }

    if (value === false) {
      return (
        <span className="compare-minus" aria-label="Tidak termasuk">
          <MinusOutlined />
        </span>
      )
    }

    return value
  }

  return (
    <div className="site-shell overflow-x-clip bg-[#f6f8fa] text-[#081630]">
      <header className="site-header">
        <div className="page-grid header-inner">
          <a className="brand-link" href="#top" aria-label="Frayukti — kembali ke atas">
            <img src={logo} alt="Frayukti" />
          </a>

          <nav className="desktop-nav" aria-label="Navigasi utama">
            <a href="#keunggulan">Keunggulan</a>
            <a href="#paket">Paket</a>
            <a href="#susun-paket">Modul</a>
            <a href="#implementasi">Implementasi</a>
          </nav>

          <Button
            className="header-cta"
            type="primary"
            href="#konsultasi"
            icon={<ArrowRightOutlined />}
            iconPlacement="end"
          >
            Konsultasi
          </Button>

          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>

        <nav
          className={`mobile-nav ${mobileMenuOpen ? 'is-open' : ''}`}
          aria-label="Navigasi seluler"
        >
          {[
            ['Keunggulan', '#keunggulan'],
            ['Paket', '#paket'],
            ['Perbandingan', '#perbandingan'],
            ['Susun Modul', '#susun-paket'],
            ['Implementasi', '#implementasi'],
            ['FAQ', '#faq'],
            ['Konsultasi', '#konsultasi'],
          ].map(([label, href], index) => (
            <a
              href={href}
              key={href}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section id="top" className="hero-section scroll-mt-20">
          <div className="hero-rule" aria-hidden="true" />
          <div className="page-grid hero-grid">
            <div className="hero-copy">
              <div className="eyebrow reveal-item">
                <span className="eyebrow-dot" />
                Sistem bisnis modular
              </div>
              <h1 className="hero-title reveal-item">
                <span>Pilih Modulnya.</span>
                <span className="hero-title-accent">Rapikan Bisnisnya.</span>
              </h1>
              <p className="hero-description reveal-item">
                Satukan penjualan, pembelian, stok, SDM, pembukuan, koperasi,
                dan laporan dalam satu sistem yang disusun mengikuti cara bisnis
                Anda bekerja.
              </p>
              <div className="hero-actions reveal-item">
                <Button
                  type="primary"
                  size="large"
                  href="#susun-paket"
                  icon={<ArrowRightOutlined />}
                  iconPlacement="end"
                >
                  Susun Paket Saya
                </Button>
                <Button
                  size="large"
                  href="#paket"
                  icon={<ArrowDownOutlined />}
                  iconPlacement="end"
                >
                  Lihat Paket
                </Button>
              </div>
              <div className="hero-proof reveal-item" aria-label="Ringkasan produk">
                <div>
                  <strong>{allModuleIds.length}</strong>
                  <span>modul pilihan</span>
                </div>
                <div>
                  <strong>06</strong>
                  <span>kelompok kerja</span>
                </div>
                <div>
                  <strong>01</strong>
                  <span>sistem terhubung</span>
                </div>
              </div>
            </div>

            <div className="hero-visual reveal-item" aria-label="Tampilan dashboard Frayukti">
              <div className="hero-stage">
                <div className="stage-grid" aria-hidden="true" />
                <div className="stage-index" aria-hidden="true">
                  F—01
                </div>
                <div className="stage-rail rail-blue" aria-hidden="true" />
                <div className="stage-rail rail-cyan" aria-hidden="true" />
                <div className="stage-rail rail-green" aria-hidden="true" />
                <img
                  className="hero-device"
                  src={laptopMockup}
                  alt="Dashboard bisnis Frayukti pada laptop"
                  width="1448"
                  height="1086"
                  fetchPriority="high"
                />
                <div className="stage-card stage-card-top">
                  <span className="status-dot" />
                  <div>
                    <small>Sistem</small>
                    <strong>Semua terhubung</strong>
                  </div>
                </div>
                <div className="stage-card stage-card-bottom">
                  <small>MODUL AKTIF</small>
                  <strong>+ Tambah saat perlu</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="industry-index">
            <div className="page-grid industry-row">
              <span className="industry-label">Dirancang untuk</span>
              <div className="industry-list">
                {industries.map((industry, index) => (
                  <span key={industry}>
                    {industry}
                    {index < industries.length - 1 && (
                      <i aria-hidden="true">/</i>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="keunggulan" className="section-block scroll-mt-20 bg-white">
          <div className="page-grid">
            <div className="section-meta">
              <span>01</span>
              <span>Keunggulan Frayukti</span>
              <span>Clarity by design</span>
            </div>

            <div className="section-lead advantage-lead">
              <h2>
                Gunakan modul yang dibutuhkan,
                <br />
                <span>tanpa sistem yang berlebihan.</span>
              </h2>
              <p>
                Frayukti menyederhanakan teknologi menjadi susunan yang bisa
                dipahami: pilih fungsi, hubungkan alur, lalu kembangkan saat siap.
              </p>
            </div>

            <div className="advantage-layout">
              <div className="advantage-visual">
                <div className="visual-label">
                  <span>OPERASIONAL / REAL-TIME</span>
                  <span>01—06</span>
                </div>
                <img
                  src={tabletMockup}
                  alt="Tampilan laporan Frayukti pada tablet"
                  width="1448"
                  height="1086"
                  loading="lazy"
                />
                <div className="visual-caption">
                  <strong>Satu pandangan.</strong>
                  <span>Angka penting tampil tanpa kebisingan.</span>
                </div>
              </div>

              <div className="benefit-grid">
                {benefits.map((benefit) => (
                  <article
                    className={`benefit-card benefit-${benefit.color}`}
                    key={benefit.number}
                  >
                    <div className="benefit-topline">
                      <span>{benefit.number}</span>
                      <span className="benefit-icon">{benefit.icon}</span>
                    </div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="paket" className="section-block scroll-mt-20 packages-section">
          <div className="page-grid">
            <div className="section-meta">
              <span>02</span>
              <span>3 Paket Bundling</span>
              <span>Fleksibel</span>
            </div>

            <div className="section-lead package-lead">
              <h2>
                Tiga paket. Satu fondasi.
                <br />
                <span>Tetap bebas disesuaikan.</span>
              </h2>
              <p>
                Pilih fondasi terdekat dengan kebutuhan Anda. Paket UMKM dan Pro
                tersedia dengan skema sekali beli, sedangkan Enterprise dirancang
                berdasarkan kompleksitas operasi Anda.
              </p>
            </div>

            <div className="package-grid">
              {visiblePlans.map((plan) => (
                <article
                  className={`package-card package-${plan.key} ${
                    activePlan === plan.key ? 'is-selected' : ''
                  }`}
                  key={plan.key}
                >
                  <div className="package-card-head">
                    <span className="package-index">{plan.index}</span>
                    {plan.recommended && (
                      <Tag color="#27c66d" variant="solid">
                        Paling seimbang
                      </Tag>
                    )}
                  </div>
                  <span className="package-kicker">{plan.kicker}</span>
                  <h3>{plan.name}</h3>
                  <p className="package-description">{plan.description}</p>
                  <div className="package-price">
                    <span>
                      {Number.isFinite(plan.price)
                        ? 'Harga tetap'
                        : 'Investasi implementasi'}
                    </span>
                    <strong>
                      {Number.isFinite(plan.price)
                        ? formatCurrency(plan.price)
                        : 'Konsultasikan'}
                    </strong>
                    <small>
                      {Number.isFinite(plan.price)
                        ? 'sekali bayar'
                        : 'sesuai kebutuhan'}
                    </small>
                  </div>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <CheckOutlined />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    type={plan.key === 'pro' ? 'primary' : 'default'}
                    size="large"
                    block
                    onClick={() => changePlan(plan.key, true)}
                    icon={<ArrowRightOutlined />}
                    iconPlacement="end"
                  >
                    {plan.action}
                  </Button>
                </article>
              ))}
            </div>

            <p className="pricing-note">
              Harga UMKM dan Pro adalah harga beli putus untuk modul bawaan, tanpa
              biaya langganan bulanan. Investasi Enterprise disusun setelah pemetaan
              kebutuhan, lingkup implementasi, dan kompleksitas alur kerja. Solusi
              Koperasi tersedia melalui paket dan alur tersendiri.
            </p>
          </div>
        </section>

        <section
          id="perbandingan"
          className="section-block scroll-mt-20 comparison-section bg-white"
        >
          <div className="page-grid">
            <div className="section-meta">
              <span>03</span>
              <span>Perbandingan Paket</span>
              <span>Decision matrix</span>
            </div>

            <div className="section-lead comparison-lead">
              <h2>
                Bandingkan dari kebutuhan,
                <br />
                <span>bukan sekadar jumlah fitur.</span>
              </h2>
              <p>
                Fokus pada skala kerja dan kedalaman kontrol yang dibutuhkan tim.
              </p>
            </div>

            <div className="comparison-table-wrap">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Kapabilitas</th>
                    {visiblePlans.map((plan) => (
                      <th key={plan.key}>
                        <span>{plan.index}</span>
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      {visiblePlans.map((plan) => (
                        <td key={plan.key}>
                          {renderComparisonValue(row[plan.key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="comparison-mobile">
              <div className="mobile-plan-tabs" role="tablist" aria-label="Pilih paket">
                {visiblePlans.map((plan) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={comparePlan === plan.key}
                    className={comparePlan === plan.key ? 'is-active' : ''}
                    onClick={() => setComparePlan(plan.key)}
                    key={plan.key}
                  >
                    {plan.name}
                  </button>
                ))}
              </div>
              <div className="mobile-compare-list">
                {comparisonRows.map((row) => (
                  <div key={row.label}>
                    <span>{row.label}</span>
                    <strong>{renderComparisonValue(row[comparePlan])}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="comparison-foot">
              <p>
                Belum yakin? Mulai dari paket terdekat. Konfigurasinya masih dapat
                disempurnakan bersama tim Frayukti.
              </p>
              <Button
                type="link"
                href="#susun-paket"
                icon={<ArrowRightOutlined />}
                iconPlacement="end"
              >
                Coba penyusun modul
              </Button>
            </div>
          </div>
        </section>

        <section id="susun-paket" className="builder-section scroll-mt-20">
          <div className="builder-backdrop" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="page-grid builder-inner">
            <div className="section-meta builder-meta">
              <span>04</span>
              <span>Susun Paket Sendiri</span>
              <span>Modular configurator</span>
            </div>

            <div className="section-lead builder-lead">
              <h2>
                Susun sistem yang bekerja
                <br />
                <span>seperti bisnis Anda.</span>
              </h2>
              <p>
                Pilih titik mulai, tambahkan modul, lalu bawa ringkasannya ke sesi
                konsultasi.
              </p>
            </div>

            <div className="builder-plan-select" aria-label="Pilih paket awal">
              <span className="builder-control-label">01 / Pilih titik mulai</span>
              <div>
                {visiblePlans.map((plan) => (
                  <button
                    type="button"
                    className={activePlan === plan.key ? 'is-active' : ''}
                    aria-pressed={activePlan === plan.key}
                    onClick={() => changePlan(plan.key)}
                    key={plan.key}
                  >
                    <span>{plan.index}</span>
                    {plan.name}
                    {activePlan === plan.key && <CheckOutlined />}
                  </button>
                ))}
              </div>
            </div>

            <div className="builder-category-nav">
              <span className="builder-control-label">02 / Pilih area kerja</span>
              <div className="category-scroll" role="tablist" aria-label="Kategori modul">
                {bundledModuleCatalog.map((category, index) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === category.key}
                    className={activeCategory === category.key ? 'is-active' : ''}
                    onClick={() => setActiveCategory(category.key)}
                    key={category.key}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {category.short}
                  </button>
                ))}
              </div>
            </div>

            <div className="builder-workspace">
              <div className="module-panel">
                <div className="module-panel-head">
                  <div>
                    <span>{currentCategory.label}</span>
                    <h3>{currentCategory.description}</h3>
                  </div>
                  <strong>
                    {currentCategory.groups.reduce(
                      (count, group) => count + group.items.length,
                      0,
                    )}{' '}
                    modul
                  </strong>
                </div>

                <div className="module-groups">
                  {currentCategory.groups.map((group) => (
                    <div className="module-group" key={group.title}>
                      <div className="module-group-title">
                        <span>{group.title}</span>
                        <span>Harga add-on / sekali beli</span>
                      </div>
                      <div className="module-list">
                        {group.items.map((module) => {
                          const isIncluded = includedModules.has(module.id)
                          const isSelected = selectedModules.has(module.id)
                          return (
                            <label
                              className={`module-row ${
                                isSelected ? 'is-selected' : ''
                              } ${isIncluded ? 'is-included' : ''}`}
                              key={`${currentCategory.key}-${module.id}`}
                            >
                              <Checkbox
                                checked={isSelected}
                                disabled={isIncluded}
                                onChange={() => toggleModule(module.id)}
                              />
                              <span className="module-name">{module.label}</span>
                              <span className="module-price">
                                {isIncluded
                                  ? 'Termasuk'
                                  : `+ ${formatCurrency(module.price)}`}
                              </span>
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="builder-summary" aria-live="polite">
                <div className="summary-head">
                  <span>03 / Tinjau susunan</span>
                  <SettingOutlined />
                </div>
                <div className="summary-plan">
                  <span>Paket awal</span>
                  <strong>{currentPlan.name}</strong>
                </div>
                <div className="summary-stats">
                  <div>
                    <span>Modul aktif</span>
                    <strong>{String(selectedModules.size).padStart(2, '0')}</strong>
                  </div>
                  <div>
                    <span>Tambahan</span>
                    <strong>
                      {String(
                        [...selectedModules].filter(
                          (id) => !includedModules.has(id),
                        ).length,
                      ).padStart(2, '0')}
                    </strong>
                  </div>
                </div>
                <div className="summary-bars" aria-hidden="true">
                  <span style={{ width: '100%' }} />
                  <span
                    style={{
                      width: `${Math.max(24, (selectedModules.size / bundledModuleIds.length) * 100)}%`,
                    }}
                  />
                  <span
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(12, (addonPrice / 2000000) * 100),
                      )}%`,
                    }}
                  />
                </div>
                <div className="summary-total">
                  <span>
                    {hasExplicitPlanPrice
                      ? 'Total beli putus'
                      : 'Investasi Enterprise'}
                  </span>
                  <strong>
                    {hasExplicitPlanPrice
                      ? formatCurrency(purchaseTotal)
                      : 'Disesuaikan'}
                  </strong>
                  <small>
                    {hasExplicitPlanPrice
                      ? 'sekali bayar*'
                      : 'setelah konsultasi*'}
                  </small>
                </div>
                <Button
                  type="primary"
                  size="large"
                  block
                  href="#konsultasi"
                  icon={<ArrowRightOutlined />}
                  iconPlacement="end"
                >
                  Konsultasikan Paket
                </Button>
                <p>
                  {hasExplicitPlanPrice
                    ? '*Total mencakup paket dan modul tambahan terpilih. Migrasi data, integrasi, atau implementasi khusus disepakati terpisah.'
                    : '*Lingkup, migrasi data, integrasi, dan kebutuhan implementasi dipetakan terlebih dahulu sebelum investasi disepakati.'}
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section
          id="implementasi"
          className="section-block scroll-mt-20 implementation-section bg-white"
        >
          <div className="page-grid">
            <div className="section-meta">
              <span>05</span>
              <span>Proses Implementasi</span>
              <span>From plan to practice</span>
            </div>

            <div className="section-lead implementation-lead">
              <h2>
                Dari kebutuhan menuju sistem
                <br />
                <span>yang benar-benar dipakai.</span>
              </h2>
              <p>
                Implementasi dimulai dari proses nyata, bukan sekadar pemasangan
                aplikasi.
              </p>
            </div>

            <div className="implementation-track">
              {implementationSteps.map((step, index) => (
                <article className="implementation-step" key={step.number}>
                  <div className="step-node">
                    <span>{step.number}</span>
                    {index < implementationSteps.length - 1 && (
                      <i aria-hidden="true" />
                    )}
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>

            <div className="implementation-note">
              <AuditOutlined />
              <div>
                <strong>Terukur sejak awal.</strong>
                <span>
                  Lingkup, urutan, hasil implementasi, dan masa garansi disepakati
                  sebelum tim mulai bekerja.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="section-block scroll-mt-20 faq-section">
          <div className="page-grid faq-layout">
            <div>
              <div className="section-meta faq-meta">
                <span>06</span>
                <span>FAQ</span>
                <span>Common questions</span>
              </div>
              <div className="faq-intro">
                <h2>
                  Sebelum Anda
                  <br />
                  <span>memutuskan.</span>
                </h2>
                <p>
                  Jawaban ringkas untuk hal-hal yang paling sering ditanyakan
                  sebelum menyusun sistem.
                </p>
              </div>
            </div>

            <Collapse
              className="frayukti-collapse"
              items={faqItems.map((item, index) => ({
                ...item,
                label: (
                  <span className="faq-question">
                    <i>{String(index + 1).padStart(2, '0')}</i>
                    {item.label}
                  </span>
                ),
              }))}
              defaultActiveKey={['1']}
              ghost
              expandIconPlacement="end"
              expandIcon={({ isActive }) =>
                isActive ? <MinusOutlined /> : <PlusOutlined />
              }
            />
          </div>
        </section>

        <section id="konsultasi" className="consultation-section scroll-mt-20">
          <div className="consultation-rails" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="page-grid consultation-inner">
            <div className="section-meta consultation-meta">
              <span>07</span>
              <span>CTA Konsultasi</span>
              <span>Langkah berikutnya</span>
            </div>

            <div className="consultation-grid">
              <div className="consultation-copy">
                <span className="consultation-kicker">Susunan yang tepat</span>
                <h2>
                  Bisnis Anda tidak perlu sistem yang berlebihan.
                  <span> Hanya yang tepat.</span>
                </h2>
                <p>
                  Ceritakan cara kerja bisnis Anda. Kami bantu memilih modul yang
                  cukup untuk hari ini dan siap mengikuti pertumbuhan berikutnya.
                </p>
              </div>

              <form className="consultation-form" onSubmit={handleConsultationSummary}>
                <div className="form-heading">
                  <span>Ringkasan konsultasi</span>
                  <strong>{currentPlan.name} / {selectedModules.size} modul</strong>
                </div>
                <label>
                  <span>Nama</span>
                  <input name="name" type="text" placeholder="Nama Anda" required />
                </label>
                <label>
                  <span>Nama bisnis</span>
                  <input
                    name="business"
                    type="text"
                    placeholder="Nama bisnis atau organisasi"
                    required
                  />
                </label>
                <div className="form-split">
                  <label>
                    <span>WhatsApp / email</span>
                    <input
                      name="contact"
                      type="text"
                      placeholder="Kontak Anda"
                      required
                    />
                  </label>
                  <label>
                    <span>Bidang usaha</span>
                    <select name="industry" defaultValue="Ritel">
                      {industries.map((industry) => (
                        <option value={industry} key={industry}>
                          {industry}
                        </option>
                      ))}
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </label>
                </div>
                <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
                  block
                  loading={isSendingConsultation}
                  icon={<ArrowRightOutlined />}
                  iconPlacement="end"
                >
                  Buat Ringkasan Konsultasi
                </Button>
                <p className="form-privacy">
                  Tidak mengirim data secara otomatis. Ringkasan akan disalin agar
                  Anda dapat membagikannya melalui kanal Frayukti pilihan Anda.
                </p>
                {copyMessage && (
                  <div className="copy-message" role="status">
                    <CheckOutlined />
                    {copyMessage}
                  </div>
                )}
              </form>
            </div>

            <footer className="site-footer">
              <img src={logo} alt="Frayukti" />
              <p>Pilih Modulnya. Rapikan Bisnisnya.</p>
              <div>
                <a href="#keunggulan">Keunggulan</a>
                <a href="#paket">Paket</a>
                <a href="#faq">FAQ</a>
                <a href="#top">Kembali ke atas ↑</a>
              </div>
              <span>© {new Date().getFullYear()} Frayukti</span>
            </footer>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
