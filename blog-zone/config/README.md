# Sidebar Configuration

Hệ thống sidebar mới cho phép bạn cấu trúc lại menu docs một cách linh hoạt, giống như trang docs của [LynxJS](https://lynxjs.org/guide/devtool/panels/layers-panel.html).

## Tính năng

- ✅ **Phân cấp nhiều level**: Hỗ trợ categories và sub-categories
- ✅ **Collapsible sections**: Các section có thể mở/đóng
- ✅ **Active state highlighting**: Item đang active có màu nổi bật
- ✅ **Flexible ordering**: Dễ dàng thay đổi thứ tự và cấu trúc
- ✅ **Auto-expand active section**: Tự động mở section chứa page đang active

## Cách sử dụng

### 1. Cấu hình Sidebar

Chỉnh sửa file `config/sidebar.ts`:

```typescript
export const sidebarConfig: SidebarItem[] = [
  {
    type: "category",
    label: "Get Started",
    collapsed: false, // Mặc định mở
    items: [
      {
        type: "link",
        label: "Introduction",
        href: "/docs/intro",
      },
      // ... thêm links khác
    ],
  },
  {
    type: "category",
    label: "HTML/CSS",
    collapsed: false,
    items: [
      {
        type: "link",
        label: "Tài liệu tham khảo",
        href: "/docs/html-css",
      },
    ],
  },
];
```

### 2. Thêm mục mới

Để thêm một mục mới:

```typescript
{
  type: 'link',
  label: 'Tên hiển thị',
  href: '/docs/slug-cua-bai-viet',
}
```

### 3. Thêm category mới

Để thêm một category mới:

```typescript
{
  type: 'category',
  label: 'Tên Category',
  collapsed: true, // true = mặc định đóng, false = mặc định mở
  items: [
    // Các links hoặc sub-categories
  ],
}
```

### 4. Nested Categories

Bạn có thể tạo categories lồng nhau:

```typescript
{
  type: 'category',
  label: 'Parent Category',
  collapsed: false,
  items: [
    {
      type: 'category',
      label: 'Sub Category',
      collapsed: true,
      items: [
        {
          type: 'link',
          label: 'Link trong sub category',
          href: '/docs/link',
        },
      ],
    },
  ],
}
```

## Styling

Sidebar sử dụng các class Tailwind với:

- **Active link**: `bg-primary text-primary-foreground` (màu nổi bật)
- **Hover state**: `hover:bg-muted/50`
- **Active section**: Category chứa page active sẽ có `text-primary`
- **Border**: Sub-items có border bên trái để dễ nhìn

## Ví dụ hoàn chỉnh

```typescript
export const sidebarConfig: SidebarItem[] = [
  {
    type: "category",
    label: "Bắt đầu",
    collapsed: false,
    items: [
      { type: "link", label: "Giới thiệu", href: "/docs/intro" },
      { type: "link", label: "Cài đặt", href: "/docs/installation" },
    ],
  },
  {
    type: "category",
    label: "HTML/CSS",
    collapsed: false,
    items: [
      { type: "link", label: "Tài liệu tham khảo", href: "/docs/html-css" },
      {
        type: "link",
        label: "Best Practices",
        href: "/docs/html-css-best-practices",
      },
    ],
  },
  {
    type: "category",
    label: "JavaScript",
    collapsed: true,
    items: [
      { type: "link", label: "ES6+ Features", href: "/docs/js-es6" },
      { type: "link", label: "Async/Await", href: "/docs/js-async" },
    ],
  },
];
```
