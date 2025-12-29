
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('[eSimGlobal] 脚本已加载，准备初始化 React...');

const container = document.getElementById('root');

if (!container) {
  console.error("[eSimGlobal] 错误: 未能找到 id 为 'root' 的挂载点");
} else {
  try {
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('[eSimGlobal] React 挂载命令已发出');
  } catch (err) {
    console.error("[eSimGlobal] 挂载过程中发生异常:", err);
    container.innerHTML = `<div style="padding:20px; color:red;">应用启动失败: ${err instanceof Error ? err.message : '未知错误'}</div>`;
  }
}
