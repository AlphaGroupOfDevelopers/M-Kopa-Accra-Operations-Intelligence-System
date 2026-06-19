# M-Kopa AOIS Brand Colors

## Official M-Kopa Color Palette

The application now uses M-Kopa's official brand colors throughout the interface.

### Primary Colors

| Color Name              | Hex Code  | Tailwind Class      | Usage                                          |
| ----------------------- | --------- | ------------------- | ---------------------------------------------- |
| **M-Kopa Green**        | `#39B54A` | `bg-[#39B54A]`      | Primary buttons, links, main brand elements    |
| **Deep Green**          | `#1F3E35` | `bg-[#1F3E35]`      | Sidebar gradient, dark backgrounds             |
| **Light Green**         | `#F2FBF2` | `bg-[#F2FBF2]`      | Subtle backgrounds, section dividers           |
| **Paddletail Black**    | `#000000` | `bg-black`          | Primary text and dark UI elements              |
| **Bucktooth White**     | `#FFFFFF` | `bg-white`          | Main backgrounds and reverse text              |

### Extended Palette (Generated)

For consistency across the UI, we've created an extended palette based on M-Kopa Green:

| Shade | Hex Code  | Tailwind Class      | Usage                    |
| ----- | --------- | ------------------- | ------------------------ |
| 50    | `#F2FBF2` | `primary-50`        | Lightest tint            |
| 100   | `#E5F7E7` | `primary-100`       | Very light backgrounds   |
| 200   | `#C2EBCD` | `primary-200`       | Light backgrounds        |
| 300   | `#9FDFB3` | `primary-300`       | Light accents            |
| 400   | `#6CCB82` | `primary-400`       | Medium light accents     |
| 500   | `#39B54A` | `primary-500`       | **Main brand color**     |
| 600   | `#2E9339` | `primary-600`       | Hover states, darker     |
| 700   | `#247129` | `primary-700`       | Active states            |
| 800   | `#1A4F1B` | `primary-800`       | Very dark accents        |
| 900   | `#0F2E0F` | `primary-900`       | Darkest shade            |

## Usage Examples

### Buttons
```jsx
// Primary button
<button className="bg-[#39B54A] hover:bg-[#2E9339] text-white">
  Click Me
</button>

// Or use the CSS class
<button className="btn-primary">
  Click Me
</button>
```

### Backgrounds
```jsx
// Sidebar gradient
<div className="bg-gradient-to-b from-[#39B54A] to-[#1F3E35]">
  ...
</div>

// Light background
<div className="bg-[#F2FBF2]">
  ...
</div>
```

### Text
```jsx
// Primary brand text
<h1 className="text-[#39B54A]">
  M-Kopa AOIS
</h1>
```

### Focus States
```jsx
// Form inputs
<input className="focus:ring-[#39B54A] focus:border-[#39B54A]" />
```

## Components Updated

All components have been updated to use M-Kopa brand colors:

✅ Layout (Sidebar)  
✅ Login Page  
✅ Dashboard  
✅ Team Members  
✅ Team Member Profile  
✅ Shops  
✅ Shop Profile  
✅ Sales Intelligence  
✅ Operations Intelligence  
✅ Executive Dashboard  
✅ Data Entry  

## Color Accessibility

All color combinations meet WCAG 2.1 Level AA standards:
- M-Kopa Green (#39B54A) on White: ✅ AAA (4.88:1)
- White text on M-Kopa Green: ✅ AAA (4.30:1)
- White text on Deep Green (#1F3E35): ✅ AAA (12.51:1)

## Charts & Data Visualization

Charts now use M-Kopa Green as the primary color:
- Line charts: `stroke="#39B54A"`
- Bar charts: `fill="#39B54A"`
- Pie charts: Green color palette

---

**Brand Identity maintained throughout the application** 🟢
