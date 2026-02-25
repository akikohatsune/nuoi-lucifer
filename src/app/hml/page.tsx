"use client";

import Image from "next/image";
import neuroImage from "./neuro.png";
import styles from "./styles.module.css";
import { goToGithubMaintenance } from "./script";

export default function HmlPage() {
  return (
    <div className={styles.page}>
      <main className={styles.layout}>
        <section className={styles.content}>
          <h1>404!</h1>
          <p>
            API của server đã bị lỗi, vui lòng thử lại sau hoặc liên hệ với quản trị
            viên để được hỗ trợ. Xin lỗi vì sự bất tiện này. Chúng tôi đang nỗ lực
            khắc phục sự cố và sẽ sớm trở lại hoạt động bình thường. Cảm ơn bạn đã
            thông cảm và kiên nhẫn chờ đợi.
            <br />
            ERR8274: \SERVER_TERMINATED_endministration
          </p>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={goToGithubMaintenance}
          >
            GitHub Maintenance!
          </button>
        </section>

        <aside className={styles.imageWrap}>
          <Image
            src={neuroImage}
            alt="neuro"
            className={styles.image}
            priority
            sizes="(max-width: 768px) 100vw, 460px"
          />
        </aside>
      </main>
    </div>
  );
}
