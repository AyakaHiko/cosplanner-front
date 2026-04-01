# 🎭 Cosplanner Frontend

This is the Vue 3-based frontend application for the Cosplanner project. It provides a modern, responsive single-page application (SPA) for cosplayers to manage their projects.

## 🛠 Tech Stack

- **Framework:** [Vue 3](https://vuejs.org/) (Composition API)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Routing:** [Vue Router 4](https://router.vuejs.org/)
- **UI Frameworks:**
    - [CoreUI Vue 5](https://coreui.io/vue/)
    - [Bootstrap 5](https://getbootstrap.com/)
- **Key Libraries:**
    - [CropperJS](https://github.com/fengyuanchen/cropperjs) & [Vue Cropperjs](https://github.com/Agontuk/vue-cropperjs) (Image cropping)
    - [Lightgallery](https://www.lightgalleryjs.com/) (Image viewing)
    - [VueDraggable](https://github.com/SortableJS/vue.draggable.next) (Drag-and-drop support)
    - [Vue Toastification](https://github.com/Maronato/vue-toastification) (Notifications)
    - [DiceBear](https://www.dicebear.com/) (Avatar generation)
- **Styling:** SASS / SCSS
- **Testing:** [Vitest](https://vitest.dev/) & Vue Test Utils

## 🚀 Key Features

- **Project Dashboard:** Visual overview of all ongoing and planned cosplay projects.
- **Advanced Image Editing:** Built-in cropper for profile pictures and project thumbnails.
- **Reference Management:** Organized albums for inspiration and reference photos.
- **Dynamic Workflows:** Drag-and-drop functionality for organizing tasks and materials.
- **Authentication:** Secure login and registration (JWT integration with backend).
- **Responsive Design:** Fully optimized for desktop and mobile devices.

## 📁 Project Structure

- `src/assets` — Static assets (images, icons).
- `src/components` — Reusable Vue components.
- `src/composables` — Composition API logic (hooks).
- `src/layouts` — Layout components (Default, Guest).
- `src/pages` — View components / routes.
- `src/router` — Navigation and route middleware.
- `src/services` — API client and external service integrations.
- `src/stores` — Pinia state management modules (auth, planner, ui, etc.).
- `src/styles` — Global SCSS styles and theme configurations.

## ⚙️ Installation & Development

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [npm](https://www.npmjs.com/)

### Setup
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 🛠 Quality Control

- **Linting:**
  ```bash
  npm run lint
  ```
- **Formatting (Prettier):**
  ```bash
  npm run format
  ```
- **Unit Testing:**
  ```bash
  npm run test:unit
  ```

---
*Developed with Vue 3 and Vite.*
