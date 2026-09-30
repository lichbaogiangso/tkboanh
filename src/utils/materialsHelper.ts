// Helper to refine and clean Teaching Materials (Đồ dùng dạy học và học liệu)
// Theo yêu cầu chỉ đạo chuyên môn:
// - Học sinh: KHÔNG ghi SGK, Vở bài tập, bảng con, phấn, bút dạ, nháp, vở ghi chép chung chung.
//   CHỈ GHI những đồ dùng, vật liệu, dụng cụ thực hành và học liệu thực sự cần thiết theo từng môn/bài học.
// - Giáo viên: CHỈ GHI những vật liệu, thiết bị số, giáo cụ trực quan và học liệu cần thiết cho nội dung từng môn.

export function getSubjectSpecificStudentMaterials(
  subject: string = "",
  grade: number = 5,
  lessonTitle: string = ""
): string[] {
  const sub = subject.toLowerCase().trim();
  const title = (lessonTitle || "").toLowerCase();

  // 1. Môn Toán
  if (sub.includes("toán") || sub === "t") {
    if (title.includes("hình") || title.includes("góc") || title.includes("chu vi") || title.includes("diện tích") || title.includes("thể tích") || title.includes("tam giác") || title.includes("thang") || title.includes("tròn")) {
      return [
        "Thước thẳng có vạch chia cm, thước đo góc (ê-ke), compa, giấy màu và kéo thủ công để ghép hình."
      ];
    }
    if (title.includes("phân số") || title.includes("thập phân") || title.includes("tỉ số")) {
      return [
        "Thước thẳng, phiếu học tập cá nhân, thẻ phân số / bảng số thập phân trực quan."
      ];
    }
    if (title.includes("đo") || title.includes("mét") || title.includes("gam") || title.includes("lít") || title.includes("thời gian") || title.includes("vận tốc")) {
      return [
        "Thước dây hoặc thước kẻ cuộn, mô hình đồng hồ / phiếu học tập đo lường."
      ];
    }
    if (grade === 1) {
      return [
        "Hộp que tính, các thẻ chữ số 0 - 10, các hình khối lập phương nhỏ và phiếu bài tập rèn luyện."
      ];
    }
    return [
      "Thước thẳng, phiếu học tập cá nhân, bộ thẻ số / que tính thực hành theo bài học."
    ];
  }

  // 2. Môn Tiếng Việt
  if (sub.includes("tiếng việt") || sub === "tv") {
    if (title.includes("đọc") || title.includes("bài") || title.includes("kể chuyện")) {
      return [
        "Tranh ảnh hoặc tư liệu sưu tầm liên quan đến chủ điểm bài đọc, phiếu luyện đọc cá nhân."
      ];
    }
    if (title.includes("viết") || title.includes("tập làm văn") || title.includes("chính tả")) {
      return [
        "Phiếu học tập rèn kỹ năng viết, sơ đồ tư duy lập dàn ý hoặc tranh ảnh tư liệu quan sát."
      ];
    }
    if (title.includes("từ") || title.includes("câu") || title.includes("ltvc")) {
      return [
        "Phiếu bài tập mở rộng vốn từ, thẻ từ ngữ phục vụ trò chơi luyện từ và câu."
      ];
    }
    if (grade === 1) {
      return [
        "Bảng gài cá nhân, bộ thẻ chữ cái và dấu thanh ghép tiếng."
      ];
    }
    return [
      "Phiếu học tập, tranh ảnh hoặc tư liệu sưu tầm theo chủ điểm bài học."
    ];
  }

  // 3. Môn Tự nhiên và Xã hội (Lớp 1, 2, 3)
  if (sub.includes("tự nhiên và xã hội") || sub.includes("tnxh")) {
    return [
      "Tranh ảnh sưu tầm, mẫu vật tự nhiên (lá cây/hoa/hạt nếu có), phiếu học tập quan sát nhóm, thẻ xử lý tình huống."
    ];
  }

  // 4. Môn Khoa học (Lớp 4, 5)
  if (sub.includes("khoa học") || sub === "kh") {
    return [
      "Vật liệu và dụng cụ thí nghiệm đơn giản theo bài học (cốc thủy tinh, nước, đất mẫu, nhiệt kế...), phiếu ghi chép thực nghiệm nhóm."
    ];
  }

  // 5. Môn Lịch sử và Địa lí (Lớp 4, 5)
  if (sub.includes("lịch sử") || sub.includes("địa lí") || sub.includes("ls&đl") || sub === "ls" || sub === "đl") {
    return [
      "Lược đồ trống, bản đồ học tập cá nhân, bút chì màu để tô ranh giới/địa danh, tư liệu lịch sử - địa lí sưu tầm."
    ];
  }

  // 6. Môn Đạo đức
  if (sub.includes("đạo đức") || sub === "đđ") {
    return [
      "Thẻ bày tỏ thái độ (thẻ mặt cười / mặt mếu hoặc thẻ hoa xanh / đỏ), phiếu xử lý tình huống đạo đức."
    ];
  }

  // 7. Hoạt động trải nghiệm
  if (sub.includes("trải nghiệm") || sub.includes("hđtn")) {
    if (title.includes("sinh hoạt dưới cờ") || title.includes("chào cờ")) {
      return [
        "Trang phục chỉnh tề (đồng phục, khăn quàng đỏ), ghế ngồi theo quy định chào cờ."
      ];
    }
    if (title.includes("sinh hoạt lớp")) {
      return [
        "Sổ theo dõi hoạt động tổ, phiếu tự đánh giá và kế hoạch rèn luyện cá nhân tuần mới."
      ];
    }
    return [
      "Giấy thủ công màu, kéo an toàn, hồ dán, bút chì màu và vật liệu tái chế theo chủ đề trải nghiệm."
    ];
  }

  // 8. Môn Tin học
  if (sub.includes("tin học") || sub === "th") {
    return [
      "Máy vi tính thực hành kết nối mạng an toàn, tệp dữ liệu bài tập thực hành do giáo viên hướng dẫn."
    ];
  }

  // 9. Môn Công nghệ
  if (sub.includes("công nghệ") || sub === "cn") {
    return [
      "Bộ dụng cụ lắp ghép mô hình kỹ thuật, vật liệu mô hình và quy trình thao tác an toàn theo bài học."
    ];
  }

  // 10. Môn Giáo dục Thể chất
  if (sub.includes("thể chất") || sub.includes("gdtc") || sub === "td") {
    return [
      "Trang phục thể thao gọn gàng, giày tập sạch sẽ, dây nhảy cá nhân (hoặc bóng theo nội dung bài tập), bình nước uống cá nhân."
    ];
  }

  // 11. Môn Mĩ thuật
  if (sub.includes("mĩ thuật") || sub === "mt") {
    return [
      "Giấy vẽ A4, bút chì, màu vẽ (sáp màu / dạ màu / màu nước), đất nặn hoặc vật liệu thủ công tái chế theo chủ đề."
    ];
  }

  // 12. Môn Âm nhạc
  if (sub.includes("âm nhạc") || sub === "an") {
    return [
      "Thanh phách gõ, song loan hoặc nhạc cụ gõ tự tạo (vỏ sò, chai nước hạt...)."
    ];
  }

  // 13. Môn Tiếng Anh
  if (sub.includes("tiếng anh") || sub.includes("anh văn") || sub === "ta") {
    return [
      "Bộ thẻ từ vựng mini (Flashcards cá nhân), phiếu luyện tập giao tiếp theo cặp."
    ];
  }

  // Fallback chung chuẩn hóa không ghi SGK/vở bài tập
  return [
    "Phiếu học tập, dụng cụ và vật liệu thực hành cần thiết theo nội dung bài học."
  ];
}

export function getSubjectSpecificTeacherMaterials(
  subject: string = "",
  grade: number = 5,
  lessonTitle: string = ""
): string[] {
  const sub = subject.toLowerCase().trim();
  const title = (lessonTitle || "").toLowerCase();

  // 1. Môn Toán
  if (sub.includes("toán") || sub === "t") {
    let specificTools = "Bộ đồ dùng dạy học Toán (que tính, bảng gài, mô hình trực quan, thẻ số).";
    if (title.includes("hình") || title.includes("góc") || title.includes("chu vi") || title.includes("diện tích") || title.includes("thể tích") || title.includes("tam giác") || title.includes("tròn")) {
      specificTools = "Bộ mô hình hình học trực quan, thước vẽ bảng lớn, ê-ke bảng, com-pa bảng.";
    } else if (title.includes("phân số") || title.includes("thập phân")) {
      specificTools = "Bộ mô hình phân số / bảng số thập phân trực quan, thẻ số học tập.";
    } else if (title.includes("đo") || title.includes("mét") || title.includes("thời gian")) {
      specificTools = "Mô hình đồng hồ số, thước mét dây, bảng quy đổi đơn vị đo.";
    }
    return [
      "Kế hoạch bài dạy, bài giảng điện tử tương tác (PPTX/Canva), thiết bị trình chiếu (Tivi/Máy chiếu).",
      `${specificTools} Phiếu học tập nhóm, bảng phụ ghi dữ liệu bài toán.`
    ];
  }

  // 2. Môn Tiếng Việt
  if (sub.includes("tiếng việt") || sub === "tv") {
    let specificAids = "Tranh ảnh, video clip minh họa bài đọc và ngữ liệu trọng tâm.";
    if (title.includes("viết") || title.includes("tập làm văn")) {
      specificAids = "Sơ đồ tư duy dàn ý mẫu, video/hình ảnh tư liệu hướng dẫn cách quan sát và dùng từ.";
    } else if (title.includes("từ") || title.includes("câu") || title.includes("ltvc")) {
      specificAids = "Bảng phụ ghi các đoạn văn/câu văn mẫu, hệ thống thẻ từ ngữ trò chơi ngôn ngữ.";
    } else if (grade === 1) {
      specificAids = "Bộ chữ biểu diễn của GV (chữ mẫu in hoa, in thường, chữ viết 4 ô ly phóng to), bảng gài lớp.";
    }
    return [
      "Kế hoạch bài dạy, bài giảng điện tử (PPTX), thiết bị trình chiếu.",
      `${specificAids} Bảng phụ đoạn văn luyện đọc diễn cảm, phiếu học tập nhóm.`
    ];
  }

  // 3. Môn Tự nhiên và Xã hội
  if (sub.includes("tự nhiên và xã hội") || sub.includes("tnxh")) {
    return [
      "Kế hoạch bài dạy, bài giảng điện tử (PPTX) tích hợp video clip và hình ảnh thực tế chất lượng cao.",
      "Bộ tranh ảnh tình huống an toàn/sức khỏe, phiếu học tập nhóm, thẻ đóng vai tình huống thực tiễn."
    ];
  }

  // 4. Môn Khoa học
  if (sub.includes("khoa học") || sub === "kh") {
    return [
      "Kế hoạch bài dạy, bài giảng điện tử đa phương tiện, video clip thí nghiệm khoa học thực tế.",
      "Bộ dụng cụ/mẫu vật thí nghiệm trực quan theo bài học, phiếu hướng dẫn quan sát và thực hành khoa học."
    ];
  }

  // 5. Môn Lịch sử và Địa lí
  if (sub.includes("lịch sử") || sub.includes("địa lí") || sub.includes("ls&đl") || sub === "ls" || sub === "đl") {
    return [
      "Kế hoạch bài dạy, bài giảng điện tử tương tác, bản đồ địa lí Việt Nam / lược đồ sự kiện lịch sử chuyên đề.",
      "Bộ tranh ảnh tư liệu hiện vật, video tài liệu lịch sử - địa lí, phiếu bài tập nhóm."
    ];
  }

  // 6. Môn Đạo đức
  if (sub.includes("đạo đức") || sub === "đđ") {
    return [
      "Kế hoạch bài dạy, bài giảng điện tử với các video clip/tranh truyện tình huống đạo đức.",
      "Bộ thẻ bày tỏ ý kiến chuẩn, phiếu bài tập xử lý tình huống gắn với học sinh tiểu học."
    ];
  }

  // 7. Hoạt động trải nghiệm
  if (sub.includes("trải nghiệm") || sub.includes("hđtn")) {
    if (title.includes("sinh hoạt dưới cờ") || title.includes("chào cờ")) {
      return [
        "Kế hoạch chào cờ tuần, bài phát động phong trào, hệ thống âm thanh loa máy và nghi lễ toàn trường."
      ];
    }
    if (title.includes("sinh hoạt lớp")) {
      return [
        "Sổ chủ nhiệm, bảng tổng hợp thi đua tuần, kế hoạch tuần mới, máy chiếu/bài giảng sơ kết."
      ];
    }
    return [
      "Kế hoạch bài dạy, bài giảng trình chiếu chủ đề, video hướng dẫn kỹ năng sống/trải nghiệm.",
      "Vật liệu làm mẫu, phiếu khảo sát/đánh giá hoạt động trải nghiệm theo chủ đề."
    ];
  }

  // 8. Môn Tin học
  if (sub.includes("tin học") || sub === "th") {
    return [
      "Phòng máy vi tính hoạt động tốt, máy chiếu/Tivi màn hình lớn, phần mềm thực hành chuyên dụng.",
      "Tệp dữ liệu mẫu hướng dẫn thực hành và tài liệu an toàn thông tin số cho học sinh."
    ];
  }

  // 9. Môn Công nghệ
  if (sub.includes("công nghệ") || sub === "cn") {
    return [
      "Kế hoạch bài dạy, sản phẩm/mô hình công nghệ mẫu, video clip hướng dẫn quy trình lắp ráp an toàn.",
      "Bộ linh kiện mẫu phóng to và bảng quy tắc an toàn kỹ thuật."
    ];
  }

  // 10. Môn Giáo dục Thể chất
  if (sub.includes("thể chất") || sub.includes("gdtc") || sub === "td") {
    return [
      "Sân bãi sạch sẽ, thoáng mát, còi chỉ huy, tranh ảnh kỹ thuật động tác phóng to.",
      "Dụng cụ thể thao phục vụ bài học (bóng, dây nhảy, nấm chiến thuật, đồng hồ bấm giờ)."
    ];
  }

  // 11. Môn Mĩ thuật
  if (sub.includes("mĩ thuật") || sub === "mt") {
    return [
      "Kế hoạch bài dạy, tranh ảnh tác phẩm mĩ thuật mẫu, bài giảng điện tử tương tác, bảng pha màu.",
      "Vật liệu và sản phẩm mĩ thuật trực quan hướng dẫn học sinh quan sát bố cục, màu sắc."
    ];
  }

  // 12. Môn Âm nhạc
  if (sub.includes("âm nhạc") || sub === "an") {
    return [
      "Đàn phím điện tử (Organ / Keyboard), micro giảng dạy, loa trợ giảng công suất chuẩn.",
      "Video bài hát mẫu kèm lời ca chạy chữ và slide tranh minh họa chủ đề bài học.",
      "Bộ nhạc cụ gõ: Thanh phách, song loan, trống con, tambourine phục vụ luyện gõ đệm."
    ];
  }

  // 13. Môn Tiếng Anh
  if (sub.includes("tiếng anh") || sub.includes("anh văn") || sub === "ta") {
    return [
      "Giáo án Tiếng Anh chuẩn CV 2345/BGDĐT, bài giảng điện tử số (PowerPoint/Canva).",
      "Bộ thẻ từ vựng trực quan (Flashcards), tệp âm thanh bản ngữ (Audio tracks) và thiết bị trình chiếu/loa."
    ];
  }

  // Fallback chung
  return [
    `Kế hoạch bài dạy, bài giảng điện tử trình chiếu, thiết bị dạy học và tranh ảnh/video minh họa môn ${subject}.`,
    "Phiếu học tập nhóm, bảng phụ và đồ dùng trực quan cần thiết theo bài dạy."
  ];
}

/**
 * Filter out forbidden generic strings:
 * - "Sách giáo khoa"
 * - "SGK"
 * - "vở bài tập"
 * - "vở bt"
 * - "bút dạ"
 * - "bảng con"
 * - "phấn"
 * - "nháp"
 * - "vở ghi bài"
 * - generic items
 */
export function cleanStudentMaterials(
  materials: string[] | undefined,
  subject: string,
  grade: number = 5,
  lessonTitle: string = ""
): string[] {
  if (!materials || materials.length === 0) {
    return getSubjectSpecificStudentMaterials(subject, grade, lessonTitle);
  }

  const forbiddenWordsRegex = /(sách giáo khoa|sgk|vở bài tập|vở bt|vở ghi bài|vở ghi chép|vở thực hành|bút dạ|phấn|bảng con|nháp|bộ đồ dùng học.*học sinh)/gi;

  const filtered = materials
    .map((item) => {
      // Split clauses or commas
      const parts = item.split(/[,;\.]+/);
      const keepParts = parts
        .map((p) => p.trim())
        .filter((p) => {
          if (!p) return false;
          // check if this part is just forbidden item
          if (forbiddenWordsRegex.test(p)) {
            // Check if it has something essential like thước kẻ, ê-ke, compa, màu vẽ, đất nặn, que tính
            const hasEssential = /(thước|ê-ke|compa|que tính|thẻ số|màu|giấy|kéo|kính|thực hành|thí nghiệm|phiếu|thanh phách|song loan|trang phục|giày|mẫu vật)/i.test(p);
            if (!hasEssential) return false;
            // Clean out the forbidden words from this part
            return true;
          }
          return true;
        })
        .map((p) => p.replace(forbiddenWordsRegex, "").replace(/^[\s,;.-]+|[\s,;.-]+$/g, "").trim())
        .filter((p) => p.length > 2);

      return keepParts.join(", ");
    })
    .filter((item) => item.length > 3);

  if (filtered.length === 0) {
    return getSubjectSpecificStudentMaterials(subject, grade, lessonTitle);
  }

  return filtered;
}

export function cleanTeacherMaterials(
  materials: string[] | undefined,
  subject: string,
  grade: number = 5,
  lessonTitle: string = ""
): string[] {
  if (!materials || materials.length === 0) {
    return getSubjectSpecificTeacherMaterials(subject, grade, lessonTitle);
  }

  const forbiddenTeacherRegex = /(sách giáo khoa|sgk)/gi;

  const filtered = materials
    .map((item) => {
      const parts = item.split(/[,;\.]+/);
      const keepParts = parts
        .map((p) => p.trim())
        .filter((p) => {
          if (!p) return false;
          if (forbiddenTeacherRegex.test(p)) {
            const hasEssential = /(bài giảng|máy chiếu|tivi|tranh|video|đồ dùng|thước|mô hình|phiếu|bảng phụ)/i.test(p);
            return hasEssential;
          }
          return true;
        })
        .map((p) => p.replace(forbiddenTeacherRegex, "").replace(/^[\s,;.-]+|[\s,;.-]+$/g, "").trim())
        .filter((p) => p.length > 2);

      return keepParts.join(", ");
    })
    .filter((item) => item.length > 3);

  if (filtered.length === 0) {
    return getSubjectSpecificTeacherMaterials(subject, grade, lessonTitle);
  }

  return filtered;
}
