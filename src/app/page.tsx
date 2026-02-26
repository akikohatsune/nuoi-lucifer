export default function Home() {
  return (
    <main>
      <div className="hero-banner">
        <img src="/avatar/videoframe_5835.png" alt="banner" />
      </div>

      <div className="container">
        <section className="hero">
          <h1 style={{ color: '#ff66aa' }}>What is the Nuôi Lucifer!?</h1>
          <p>Trong thời đại mà "từ thiện" đã trở thành từ nhạy cảm, Tôi xin khẳng định: HÃY NUÔI TÔI!</p>
        </section>

        <section>
          <div className="info-box">
            <strong>#Kome-note</strong><br />
            Tôi sẽ thêm tính năng chat online ngay trên chính trang này (và chắc chắn là realtime!)<br></br>
            Tất cả chỉ là dự kiến, Have a good day!
          </div>
        </section>

        <section>
          <h2 style={{ color: '#ff66aa' }}>Tại Sao Nên Nuôi Lucifer?</h2>
          <div className="badges">
            <ul>
              <li>🥉 <span className="highlight">Sao Kê Cực Kì Nhanh:</span> Cập nhật Lucifer stream xong!</li>
              <li>🥈 <span className="highlight">Minh Bạch:</span> Tôi còn báo cáo cả việc mua ly trà sữa!</li>
              <li>🥇 <span className="highlight">Phản Hồi Siêu Nhanh</span> Trả lời inbox nhanh hơn cả ánh sáng</li>
            </ul>
          </div>

          <h3>Cam kết của Lucifer</h3>
          <table>
            <thead>
              <tr>
                <th>Cam kết</th>
                <th>Lời cam kết</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Sao kê mỗi ngày</td><td> Cập nhật lúc Lucifer stream xong! (Kể cả Chủ Nhật & Lễ)</td></tr>
              <tr><td>Chất lượng sao kê</td><td>Mọi độ phân giải (720p, 1080p, 4K,....)</td></tr>
              <tr><td>Độ chính xác</td><td>Số liệu chính xác đến từng đồng</td></tr>
              <tr><td>Support</td><td>Trả lời inbox nhanh hơn cả ánh sáng</td></tr>
              <tr><td>Không giấu giếm</td><td>Mọi thứ đều được ghi chép tỉ mỉ!</td></tr>
            </tbody>
          </table>
        </section>

        <footer style={{ marginTop: '50px', textAlign: 'center', color: '#777', fontSize: '12px' }}>
          <p>Tôi nghèo, tôi cần tiền, nhưng tôi KHÔNG MẤT LƯƠNG TÂM! Mỗi đồng tiền các bạn gửi, tôi sẽ chi tiêu rõ ràng, minh bạch như bụng đói của tôi vậy! 😭</p>
          <p>(kome, what is this? nothing)</p>
        </footer>
      </div>
    </main>
  );
}
