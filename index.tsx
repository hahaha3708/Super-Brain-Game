
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

// Chỉ khởi tạo React nếu tìm thấy phần tử root và trang không phải là trang tĩnh hoàn toàn
if (rootElement) {
  // Nếu bạn muốn dùng hoàn toàn Vanilla JS cho index.html, 
  // ta có thể để React render rỗng hoặc một phần nhỏ của UI.
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      {/* App hiện tại có thể gây xung đột nội dung nếu index.html đã có sẵn HTML */}
      {/* Chúng ta giữ nó ở đây để tránh lỗi, nhưng có thể điều chỉnh App.tsx */}
    </React.StrictMode>
  );
}
