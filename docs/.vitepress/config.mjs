import { withMermaid } from "vitepress-plugin-mermaid"

// https://vitepress.dev/reference/site-config
export default withMermaid({
  // 基础路径 - GitHub Pages项目站点必须设置
  base: '/keisoku-kogaku/',
  
  // 网站标题
  title: "計測工学",
  
  // 网站描述
  description: "福岡工業大学 知能機械工学科 - Measurement Engineering",
  
  // 语言
  lang: 'ja-JP',

  // favicon
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/keisoku-kogaku/favicon.svg' }]],

  
  // 主题配置
  themeConfig: {
    // 导航栏
    nav: [
      { text: 'ホーム', link: '/' },
      { text: '講義', link: '/weeks/week-01' },
      { text: '参考文献', link: '/references' }
    ],

    // 侧边栏
    sidebar: {
      '/weeks/': [
        {
          text: '第1部：基礎理論',
          collapsed: false,
          items: [
            { text: '第1週：センサの基礎', link: '/weeks/week-01' },
            { text: '第2週：誤差と精度', link: '/weeks/week-02' },
            { text: '第3週：統計処理(1)', link: '/weeks/week-03' },
            { text: '第4週：統計処理(2)', link: '/weeks/week-04' },
            { text: '第5週：統計処理(3)', link: '/weeks/week-05' },
            { text: '第6週：信号処理', link: '/weeks/week-06' },
            { text: '第7週：信号特性', link: '/weeks/week-07' }
          ]
        },
        {
          text: '中間試験',
          items: [
            { text: '第8週：中間試験', link: '/weeks/week-08' }
          ]
        },
        {
          text: '第2部：各種センサ',
          collapsed: false,
          items: [
            { text: '第9週：位置・距離センサ', link: '/weeks/week-09' },
            { text: '第10週：画像センサ', link: '/weeks/week-10' },
            { text: '第11週：角度・回転計測', link: '/weeks/week-11' },
            { text: '第12週：加速度センサ', link: '/weeks/week-12' },
            { text: '第13週：力センサ', link: '/weeks/week-13' },
            { text: '第14週：圧力センサ', link: '/weeks/week-14' }
          ]
        },
        {
          text: 'まとめ',
          items: [
            { text: '第15週：総合演習', link: '/weeks/week-15' },
            { text: '第16週：期末試験', link: '/weeks/week-16' }
          ]
        }
      ],
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/fit-ime-cao/keisoku-kogaku' }
    ],
    
    // 页脚
    footer: {
      message: '福岡工業大学 工学部 知能機械工学科',
      copyright: '© 2026 FIT-IME-CAO'
    },
    
    // 搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '検索',
            buttonAriaLabel: '検索'
          },
          modal: {
            noResultsText: '結果が見つかりません',
            resetButtonTitle: 'クリア',
            footer: {
              selectText: '選択',
              navigateText: '移動'
            }
          }
        }
      }
    },
    
    // 文档页脚导航
    docFooter: {
      prev: '前のページ',
      next: '次のページ'
    },
    
    // 大纲标题
    outlineTitle: '目次',
    
    // 最后更新时间
    lastUpdatedText: '最終更新'
  },
  
  // Markdown 配置
  markdown: {
    math: true,
    lineNumbers: true
  },
  
  // 最后更新时间
  lastUpdated: true,

  // Mermaid 配置
  mermaid: {
    // https://mermaid.js.org/config/setup/modules/mermaidAPI.html
  },
  mermaidPlugin: {
    class: "mermaid"
  }
})
