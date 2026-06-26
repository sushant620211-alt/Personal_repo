export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#2d1820] border-t border-[#f0ddd4] dark:border-[#4a2832] py-8 text-center px-5">
      <p className="text-[#6b5744] dark:text-[#c8a898] text-sm">
        Made with <span className="text-[#c0404e] dark:text-[#e8798a]">❤️</span> for Nitu Kumari&apos;s Marriage Biodata
      </p>
      <p className="text-xs text-[#6b5744]/60 dark:text-[#c8a898]/50 mt-1">
        © {new Date().getFullYear()} · All rights reserved · Photos &amp; content are private and protected
      </p>
    </footer>
  )
}