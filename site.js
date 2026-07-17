# Use DecapBridge classic auth (required)
backend:
  name: git-gateway
  repo: wogns12090-prog/boaz-website
  branch: main
  identity_url: https://auth.decapbridge.com/sites/52da4e19-773e-4588-b538-48d29e34e2b7
  gateway_url: https://gateway.decapbridge.com
  # See who did what (optional)
  commit_messages:
    create: Create {{collection}} "{{slug}}" - {{author-name}} <{{author-login}}> via DecapBridge
    update: Update {{collection}} "{{slug}}" - {{author-name}} <{{author-login}}> via DecapBridge
    delete: Delete {{collection}} "{{slug}}" - {{author-name}} <{{author-login}}> via DecapBridge
    uploadMedia: Upload "{{path}}" - {{author-name}} <{{author-login}}> via DecapBridge
    deleteMedia: Delete "{{path}}" - {{author-name}} <{{author-login}}> via DecapBridge
    openAuthoring: Message {{message}} - {{author-name}} <{{author-login}}> via DecapBridge
# Better Decap + Bridge logo (optional)
logo_url: https://decapbridge.com/decapcms-with-bridge.svg
# Add site links in Decap CMS (optional)
site_url: https://boaz-website.netlify.app

media_folder: "assets/uploads"
public_folder: "/assets/uploads"

collections:
  - name: "reviews"
    label: "이용후기 (BZ REVIEW)"
    files:
      - name: "reviews"
        label: "이용후기 목록"
        file: "data/reviews.json"
        fields:
          - label: "후기 목록"
            name: "reviews"
            widget: "list"
            summary: "{{fields.title}} — {{fields.author}} ({{fields.rating}}점)"
            fields:
              - {label: "ID (숫자, 겹치지 않게)", name: "id", widget: "string"}
              - {label: "사진 (선택, 안 올리면 기본 배경 사용)", name: "image", widget: "image", required: false, media_folder: "/assets/uploads/reviews", public_folder: "/assets/uploads/reviews"}
              - {label: "별점 (1~5)", name: "rating", widget: "number", value_type: "float", min: 1, max: 5, step: 0.1}
              - {label: "제목", name: "title", widget: "string"}
              - {label: "요약 (목록 카드에 짧게 보이는 글)", name: "summary", widget: "text"}
              - label: "본문 (상세 페이지)"
                name: "body"
                widget: "markdown"
                required: false
                buttons: ["bold", "italic", "link"]
                editor_components: ["image"]
              - {label: "작성자 (예: 김OO 팀장)", name: "author", widget: "string"}
              - {label: "업종", name: "industry", widget: "string"}
              - {label: "지역", name: "region", widget: "string"}
              - {label: "날짜", name: "date", widget: "date", format: "YYYY-MM-DD"}
              - {label: "관리자 답글 (선택, 비워두면 안 보임)", name: "reply", widget: "text", required: false}
              - {label: "답글 날짜 (선택)", name: "replyDate", widget: "date", required: false, format: "YYYY-MM-DD"}

  - name: "stories"
    label: "BZ STORY (소식)"
    files:
      - name: "stories"
        label: "소식 목록"
        file: "data/stories.json"
        fields:
          - label: "소식 목록"
            name: "stories"
            widget: "list"
            summary: "[{{fields.category}}] {{fields.title}}"
            fields:
              - {label: "ID (숫자, 겹치지 않게)", name: "id", widget: "string"}
              - {label: "카테고리", name: "category", widget: "select", options: ["환경뉴스", "회사소식"]}
              - {label: "사진 (선택, 안 올리면 기본 배경 사용)", name: "image", widget: "image", required: false, media_folder: "/assets/uploads/stories", public_folder: "/assets/uploads/stories"}
              - {label: "제목", name: "title", widget: "string"}
              - {label: "요약 (목록 카드에 짧게 보이는 글)", name: "summary", widget: "text"}
              - label: "본문 (상세 페이지)"
                name: "body"
                widget: "markdown"
                required: false
                buttons: ["bold", "italic", "link"]
                editor_components: ["image"]
              - {label: "날짜", name: "date", widget: "date", format: "YYYY-MM-DD"}
              - {label: "조회수 (숫자만, 처음엔 0으로 시작해도 됨)", name: "views", widget: "string", default: "0"}
