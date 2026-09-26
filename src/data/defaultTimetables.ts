import { DayOfWeek, Grade, MasterTimetable, ScheduleItem, SessionType } from "../types";
import { getDetailedMusicLesson } from "./musicLessonDetails";
import { getDetailedEnglishLesson } from "./englishLessonDetails";
import { getGradeCurriculumLesson } from "./gradeCurriculums";
import { cleanLessonTitle } from "../utils/lessonTitleHelper";
import { getShlAtgtLessonTitleForLbg } from "./atgtCurriculum";

export interface TeacherInfo {
  id: string;
  name: string;
  role: string;
  type: "homeroom" | "specialist";
  specialistSubject?: string;
  assignedClasses?: string[];
  subjects: string[];
  teachingPeriods: number;
  concurrentPeriods?: number;
  totalPeriods?: number;
  grade?: Grade;
}

export const DEFAULT_TEACHERS: TeacherInfo[] = [
  // 13 GIÁO VIÊN CHỦ NHIỆM (KHỐI 1 ĐẾN KHỐI 5)
  { id: "oanh_1a1", name: "Cô Oanh", role: "GVCN 1A1", type: "homeroom", assignedClasses: ["1A1", "1A"], subjects: ["Tiếng Việt", "Toán", "HĐTN", "TCTV", "TCT"], teachingPeriods: 18, concurrentPeriods: 5, totalPeriods: 23 },
  { id: "diem_1b", name: "Cô Diễm", role: "GVCN 1B", type: "homeroom", assignedClasses: ["1B"], subjects: ["Tiếng Việt", "Toán", "HĐTN", "TCTV"], teachingPeriods: 19, concurrentPeriods: 4, totalPeriods: 23 },
  { id: "minh_2a1", name: "Cô Minh", role: "GVCN 2A1", type: "homeroom", assignedClasses: ["2A1"], subjects: ["Tiếng Việt", "Toán", "HĐTN", "TCTV", "TCT"], teachingPeriods: 18, concurrentPeriods: 5, totalPeriods: 23 },
  { id: "hoa_2a", name: "Cô Hoa", role: "GVCN 2A", type: "homeroom", assignedClasses: ["2A", "2A2"], subjects: ["Tiếng Việt", "Toán", "HĐTN", "TCTV"], teachingPeriods: 19, concurrentPeriods: 4, totalPeriods: 23 },
  { id: "loan_3a1", name: "Cô Loan", role: "GVCN 3A1", type: "homeroom", assignedClasses: ["3A1", "3A"], subjects: ["Tiếng Việt", "Toán", "HĐTN", "TCT"], teachingPeriods: 19, concurrentPeriods: 4, totalPeriods: 23 },
  { id: "thuong_3a2", name: "Cô Thương", role: "GVCN 3A2", type: "homeroom", assignedClasses: ["3A2"], subjects: ["Tiếng Việt", "Toán", "HĐTN", "TCT", "CN"], teachingPeriods: 19, concurrentPeriods: 4, totalPeriods: 23 },
  { id: "thiet_3b", name: "Thầy Thiết", role: "GVCN 3B", type: "homeroom", assignedClasses: ["3B"], subjects: ["Tiếng Việt", "Toán", "HĐTN", "TCT", "TNXH", "CN"], teachingPeriods: 19, concurrentPeriods: 4, totalPeriods: 23 },
  { id: "luong_4a1", name: "Thầy Lượng", role: "GVCN 4A1", type: "homeroom", assignedClasses: ["4A1", "4A"], subjects: ["Tiếng Việt", "Toán", "HĐTN", "TCT", "TCTV"], teachingPeriods: 19, concurrentPeriods: 4, totalPeriods: 23 },
  { id: "tam_4a2", name: "Thầy Tam", role: "GVCN 4A2", type: "homeroom", assignedClasses: ["4A2"], subjects: ["Tiếng Việt", "Toán", "HĐTN", "TCTV", "LS&ĐL"], teachingPeriods: 19, concurrentPeriods: 4, totalPeriods: 23 },
  { id: "van_4b", name: "Cô Vân", role: "GVCN 4B", type: "homeroom", assignedClasses: ["4B"], subjects: ["Tiếng Việt", "Toán", "HĐTN", "TCT", "TCTV", "CN", "LS&ĐL"], teachingPeriods: 19, concurrentPeriods: 4, totalPeriods: 23 },
  { id: "ngan_5a1", name: "Cô Ngân", role: "GVCN 5A1", type: "homeroom", assignedClasses: ["5A1", "5A"], subjects: ["Tiếng Việt", "Toán", "HĐTN", "KH", "LS&ĐL", "TCT"], teachingPeriods: 20, concurrentPeriods: 3, totalPeriods: 23 },
  { id: "hong_5a2", name: "Cô Hồng", role: "GVCN 5A2", type: "homeroom", assignedClasses: ["5A2"], subjects: ["Tiếng Việt", "Toán", "HĐTN", "TCTV", "ĐĐ"], teachingPeriods: 19, concurrentPeriods: 4, totalPeriods: 23 },
  { id: "tloan_5b", name: "Cô T.Loan", role: "GVCN 5B", type: "homeroom", assignedClasses: ["5B"], subjects: ["Tiếng Việt", "Toán", "HĐTN", "TCT", "LS&ĐL", "KH"], teachingPeriods: 19, concurrentPeriods: 4, totalPeriods: 23 },

  // GIÁO VIÊN BỘ MÔN & CHUYÊN (TOÀN TRƯỜNG)
  { id: "trinh_ta", name: "Cô Trinh", role: "GV Chuyên Tiếng Anh - TA(TR)", type: "specialist", specialistSubject: "Tiếng Anh", assignedClasses: ["3A2", "3B", "4A1", "4A2", "4B", "5A1", "5A2", "5B"], subjects: ["Tiếng Anh", "TA"], teachingPeriods: 20, totalPeriods: 20 },
  { id: "quynh_ta", name: "Cô Quỳnh", role: "GV Chuyên Tiếng Anh - TA(Q)", type: "specialist", specialistSubject: "Tiếng Anh", assignedClasses: ["3A1", "3A2"], subjects: ["Tiếng Anh", "TA"], teachingPeriods: 8, totalPeriods: 8 },
  { id: "thao_gdtc", name: "Thầy Thảo", role: "GV Chuyên GDTC & HĐTN - (T)", type: "specialist", specialistSubject: "Giáo dục Thể chất", assignedClasses: ["1A1", "1B", "2A1", "2A", "3A1", "3A2", "3B"], subjects: ["Giáo dục Thể chất", "GDTC", "HĐTN", "BDNK"], teachingPeriods: 18, totalPeriods: 18 },
  { id: "thinh_gdtc", name: "Thầy Thịnh", role: "GV Chuyên GDTC & HĐTN - (Th)", type: "specialist", specialistSubject: "Giáo dục Thể chất", assignedClasses: ["3B", "4A1", "4A2", "4B", "5A1", "5A2", "5B"], subjects: ["Giáo dục Thể chất", "GDTC", "HĐTN"], teachingPeriods: 18, totalPeriods: 18 },
  { id: "phuong_bm", name: "Cô Phượng", role: "GV Bộ môn - (P)", type: "specialist", specialistSubject: "Tự nhiên và Xã hội", assignedClasses: ["1A1", "1B", "2A1", "2A", "5A2"], subjects: ["Tự nhiên và Xã hội", "TNXH", "Đạo đức", "ĐĐ", "TCT", "TCTV", "LS&ĐL"], teachingPeriods: 16, totalPeriods: 16 },
  { id: "hue_bm", name: "Cô Huế", role: "GV Bộ môn - (H)", type: "specialist", specialistSubject: "Lịch sử và Địa lí", assignedClasses: ["3A1", "3A2", "3B", "4A1", "4A2", "4B", "5A1", "5B"], subjects: ["Lịch sử và Địa lí", "LS&ĐL", "Khoa học", "KH", "Công nghệ", "CN", "Đạo đức", "TNXH"], teachingPeriods: 18, totalPeriods: 18 },
  { id: "tanbinh_bm", name: "Thầy/Cô Tân Bình", role: "GV Bộ môn - (TB)", type: "specialist", specialistSubject: "Khoa học", assignedClasses: ["2A", "5A1", "5A2"], subjects: ["Đạo đức", "ĐĐ", "Khoa học", "KH", "Công nghệ", "CN"], teachingPeriods: 6, totalPeriods: 6 },
  { id: "tam_an", name: "Cô Tâm", role: "GV Chuyên Âm nhạc", type: "specialist", specialistSubject: "Âm nhạc", assignedClasses: ["1A1", "1B", "2A1", "2A", "3A1", "3A2", "3B", "4A1", "4A2", "5A1", "5A2", "5B"], subjects: ["Âm nhạc", "AN", "BDAN"], teachingPeriods: 18, totalPeriods: 18 },
  { id: "thy_mt", name: "Thầy Thy", role: "GV Chuyên Mĩ thuật", type: "specialist", specialistSubject: "Mĩ thuật", assignedClasses: ["1A1", "1B", "2A1", "2A", "3A1", "3A2", "3B", "4A1", "4A2", "4B", "5A1", "5A2"], subjects: ["Mĩ thuật", "MT"], teachingPeriods: 16, totalPeriods: 16 },
  { id: "phuong_th", name: "Thầy Phương", role: "GV Chuyên Tin học", type: "specialist", specialistSubject: "Tin học", assignedClasses: ["1A1", "1B", "2A1", "2A", "3A1", "3A2", "3B", "4A1", "4A2", "4B", "5A1", "5A2", "5B"], subjects: ["Tin học", "TH"], teachingPeriods: 15, totalPeriods: 15 },
];

export const DEFAULT_CLASSES = ["1A1", "1B", "2A1", "2A", "3A1", "3A2", "3B", "4A1", "4A2", "4B", "5A1", "5A2", "5B"];

// Timetable Tuần 1 (07/09/2026 - 11/09/2026)
export const TIMETABLE_TUAN_1_SLOTS: Record<string, Record<string, string>> = {
  "Thứ Hai_Sáng_1": { "1A1": "HĐTN (CC)", "1B": "HĐTN (CC)", "2A1": "HĐTN (CC)", "2A": "HĐTN (CC)", "3A1": "HĐTN (CC)", "3A2": "HĐTN (CC)", "3B": "HĐTN (CC)", "4A1": "HĐTN (CC)", "4A2": "HĐTN (CC)", "4B": "HĐTN (CC)", "5A1": "HĐTN (CC)", "5A2": "HĐTN (CC)", "5B": "HĐTN (CC)" },
  "Thứ Hai_Sáng_2": { "1A1": "Tiếng Việt", "1B": "Tiếng Việt", "2A1": "TV", "2A": "TV", "3A1": "TV", "3A2": "TV", "3B": "TV", "4A1": "TV", "4A2": "TV", "4B": "TV", "5A1": "TV", "5A2": "TV", "5B": "TV" },
  "Thứ Hai_Sáng_3": { "1A1": "Tiếng Việt", "1B": "Tiếng Việt", "2A1": "TV", "2A": "TV", "3A1": "TV", "3A2": "TV", "3B": "TV", "4A1": "TV", "4A2": "TV", "4B": "TV", "5A1": "TV", "5A2": "TV", "5B": "TV" },
  "Thứ Hai_Sáng_4": { "1A1": "T", "1B": "T", "2A1": "T", "2A": "T", "3A1": "T", "3A2": "T", "3B": "T", "4A1": "T", "4A2": "T", "4B": "T", "5A1": "T", "5A2": "T", "5B": "T" },
  "Thứ Hai_Sáng_5": { "1A1": "", "1B": "", "2A1": "", "2A": "", "3A1": "", "3A2": "", "3B": "", "4A1": "", "4A2": "", "4B": "", "5A1": "", "5A2": "", "5B": "" },
};

// ==============================================================================
// THỜI KHÓA BIỂU CHÍNH THỨC NĂM HỌC 2026-2027 (TUẦN 2 TỪ 14/09/2026 - 18/09/2026)
// Đồng bộ 100% theo bản TKB mới tải lên cho 13 Lớp & Giáo viên toàn trường:
// 1A1 (Cô Oanh), 1B (Cô Diễm), 2A1 (Cô Minh), 2A (Cô Hoa), 3A1 (Cô Loan),
// 3A2 (Cô Thương), 3B (Thầy Thiết), 4A1 (Thầy Lượng), 4A2 (Thầy Tam), 4B (Cô Vân),
// 5A1 (Cô Ngân), 5A2 (Cô Hồng), 5B (Cô T.Loan)
// ==============================================================================
export const TIMETABLE_TUAN_2_SLOTS: Record<string, Record<string, string>> = {
  // THỨ HAI (14/09/2026)
  "Thứ Hai_Sáng_1": {
    "1A1": "HĐTN", "1B": "HĐTN", "2A1": "HĐTN", "2A": "HĐTN",
    "3A1": "HĐTN", "3A2": "HĐTN", "3B": "HĐTN",
    "4A1": "HĐTN", "4A2": "HĐTN", "4B": "HĐTN",
    "5A1": "HĐTN", "5A2": "HĐTN", "5B": "HĐTN"
  },
  "Thứ Hai_Sáng_2": {
    "1A1": "Tiếng Việt", "1B": "Tiếng Việt", "2A1": "TV", "2A": "TV",
    "3A1": "TV", "3A2": "TV", "3B": "TV",
    "4A1": "TV", "4A2": "TV", "4B": "TV",
    "5A1": "TV", "5A2": "TV", "5B": "TV"
  },
  "Thứ Hai_Sáng_3": {
    "1A1": "Tiếng Việt", "1B": "Tiếng Việt", "2A1": "TV", "2A": "TV",
    "3A1": "TV", "3A2": "TV", "3B": "TV",
    "4A1": "TV", "4A2": "TV", "4B": "TV",
    "5A1": "TV", "5A2": "TV", "5B": "TV"
  },
  "Thứ Hai_Sáng_4": {
    "1A1": "T", "1B": "T", "2A1": "T", "2A": "T",
    "3A1": "T", "3A2": "T", "3B": "T",
    "4A1": "T", "4A2": "T", "4B": "T",
    "5A1": "T", "5A2": "T", "5B": "T"
  },
  "Thứ Hai_Sáng_5": {
    "1A1": "", "1B": "", "2A1": "", "2A": "", "3A1": "", "3A2": "", "3B": "",
    "4A1": "", "4A2": "", "4B": "", "5A1": "", "5A2": "", "5B": ""
  },

  "Thứ Hai_Chiều_1": {
    "1A1": "ĐĐ(P)", "1B": "Tiếng Việt", "2A1": "GDTC(T)", "2A": "TV",
    "3A1": "ĐĐ(H)", "3A2": "CN", "3B": "MT",
    "4A1": "TV", "4A2": "TV", "4B": "TA(TR)",
    "5A1": "KH", "5A2": "GDTC(Th)", "5B": "AN"
  },
  "Thứ Hai_Chiều_2": {
    "1A1": "TNXH", "1B": "TV", "2A1": "TCTV", "2A": "GDTC(T)",
    "3A1": "TNXH", "3A2": "TA(TR)", "3B": "ĐĐ(H)",
    "4A1": "TCT", "4A2": "AN", "4B": "GDTC(Th)",
    "5A1": "KH(TB)", "5A2": "MT", "5B": ""
  },
  "Thứ Hai_Chiều_3": {
    "1A1": "TCTV", "1B": "MT", "2A1": "TCTV", "2A": "ĐĐ(TB)",
    "3A1": "TNXH(H)", "3A2": "GDTC(T)", "3B": "AN",
    "4A1": "TCT", "4A2": "LS&ĐL", "4B": "GDTC(Th)",
    "5A1": "LS&ĐL", "5A2": "CN(TB)", "5B": "TA(TR)"
  },
  "Thứ Hai_Chiều_4": {
    "1A1": "", "1B": "", "2A1": "", "2A": "", "3A1": "", "3A2": "", "3B": "",
    "4A1": "", "4A2": "", "4B": "", "5A1": "", "5A2": "", "5B": ""
  },

  // THỨ BA (15/09/2026)
  "Thứ Ba_Sáng_1": {
    "1A1": "GDTC(T)", "1B": "Tiếng Việt", "2A1": "TNXH(P)", "2A": "MT",
    "3A1": "T", "3A2": "AN", "3B": "GDTC(Th)",
    "4A1": "KH(H)", "4A2": "T", "4B": "T",
    "5A1": "T", "5A2": "T", "5B": "TA(TR)"
  },
  "Thứ Ba_Sáng_2": {
    "1A1": "HĐTN(T)", "1B": "Tiếng Việt", "2A1": "T", "2A": "TCT(P)",
    "3A1": "MT", "3A2": "T", "3B": "T",
    "4A1": "CN(H)", "4A2": "AN", "4B": "TA(TR)",
    "5A1": "TV", "5A2": "TV", "5B": "GDTC(Th)"
  },
  "Thứ Ba_Sáng_3": {
    "1A1": "Tiếng Việt", "1B": "Tiếng Việt", "2A1": "GDTC(T)", "2A": "TNXH",
    "3A1": "TV", "3A2": "TV", "3B": "TA(TR)",
    "4A1": "MT", "4A2": "KH(H)", "4B": "TV",
    "5A1": "AN", "5A2": "ĐĐ", "5B": "T"
  },
  "Thứ Ba_Sáng_4": {
    "1A1": "Tiếng Việt", "1B": "GDTC(T)", "2A1": "AN", "2A": "TCTV(P)",
    "3A1": "TCT", "3A2": "TCT", "3B": "TV",
    "4A1": "GDTC(Th)", "4A2": "TV", "4B": "CN",
    "5A1": "TA(TR)", "5A2": "TV", "5B": ""
  },
  "Thứ Ba_Sáng_5": {
    "1A1": "", "1B": "", "2A1": "", "2A": "", "3A1": "", "3A2": "", "3B": "",
    "4A1": "", "4A2": "", "4B": "", "5A1": "", "5A2": "", "5B": ""
  },

  "Thứ Ba_Chiều_1": {
    "1A1": "Tiếng Việt", "1B": "ĐĐ(P)", "2A1": "TV", "2A": "T",
    "3A1": "AN", "3A2": "MT", "3B": "Tin học",
    "4A1": "TA(TR)", "4A2": "TV", "4B": "LS&ĐL",
    "5A1": "ĐĐ(H)", "5A2": "HĐTN(Th)", "5B": "TCT"
  },
  "Thứ Ba_Chiều_2": {
    "1A1": "TCTV", "1B": "TNXH", "2A1": "HĐTN(T)", "2A": "TV",
    "3A1": "Tin học", "3A2": "TA(Q)", "3B": "MT",
    "4A1": "AN", "4A2": "GDTC(Th)", "4B": "ĐĐ(H)",
    "5A1": "KH", "5A2": "TA(TR)", "5B": "KH"
  },
  "Thứ Ba_Chiều_3": {
    "1A1": "T", "1B": "TCTV", "2A1": "TV", "2A": "GDTC(T)",
    "3A1": "TA(Q)", "3A2": "Tin học", "3B": "BDAN",
    "4A1": "T", "4A2": "TA(TR)", "4B": "KH(H)",
    "5A1": "HĐTN(Th)", "5A2": "MT", "5B": "LS&ĐL"
  },
  "Thứ Ba_Chiều_4": {
    "1A1": "", "1B": "", "2A1": "", "2A": "", "3A1": "", "3A2": "", "3B": "",
    "4A1": "", "4A2": "", "4B": "", "5A1": "", "5A2": "", "5B": ""
  },

  // THỨ TƯ (16/09/2026)
  "Thứ Tư_Sáng_1": {
    "1A1": "Tiếng Việt", "1B": "Tin học", "2A1": "T", "2A": "T",
    "3A1": "GDTC(T)", "3A2": "T", "3B": "T",
    "4A1": "TV", "4A2": "T", "4B": "TA(TR)",
    "5A1": "CN(H)", "5A2": "LS&ĐL(P)", "5B": "BDAN"
  },
  "Thứ Tư_Sáng_2": {
    "1A1": "Tiếng Việt", "1B": "AN", "2A1": "TCTV", "2A": "Tin học",
    "3A1": "HĐTN(T)", "3A2": "ĐĐ(H)", "3B": "TA(TR)",
    "4A1": "TV", "4A2": "TV", "4B": "T",
    "5A1": "T", "5A2": "T", "5B": "TV"
  },
  "Thứ Tư_Sáng_3": {
    "1A1": "TCT(p)", "1B": "Tiếng Việt", "2A1": "Tin học", "2A": "HĐTN(T)",
    "3A1": "TA(Q)", "3A2": "BDAN", "3B": "TV",
    "4A1": "LS&ĐL(H)", "4A2": "TA(TR)", "4B": "HĐTN(Th)",
    "5A1": "TV", "5A2": "TV", "5B": "TV"
  },
  "Thứ Tư_Sáng_4": {
    "1A1": "Tin học", "1B": "Tiếng Việt", "2A1": "TV", "2A": "AN",
    "3A1": "T", "3A2": "TA(Q)", "3B": "TV",
    "4A1": "TA(TR)", "4A2": "KH(H)", "4B": "TCT",
    "5A1": "TV", "5A2": "TV", "5B": "HĐTN(Th)"
  },
  "Thứ Tư_Sáng_5": {
    "1A1": "", "1B": "", "2A1": "", "2A": "", "3A1": "", "3A2": "", "3B": "",
    "4A1": "", "4A2": "", "4B": "", "5A1": "", "5A2": "", "5B": ""
  },

  "Thứ Tư_Chiều_1": {
    "1A1": "MT", "1B": "GDTC(T)", "2A1": "ĐĐ(P)", "2A": "TCTV",
    "3A1": "TV", "3A2": "TV", "3B": "GDTC(Th)",
    "4A1": "T", "4A2": "ĐĐ(H)", "4B": "Tin học",
    "5A1": "TA(TR)", "5A2": "AN", "5B": "T"
  },
  "Thứ Tư_Chiều_2": {
    "1A1": "AN", "1B": "HĐTN(T)", "2A1": "TV", "2A": "TNXH(P)",
    "3A1": "TV", "3A2": "TV", "3B": "TNXH",
    "4A1": "HĐTN(Th)", "4A2": "CN(H)", "4B": "MT",
    "5A1": "Tin học", "5A2": "TA(TR)", "5B": "TV"
  },
  "Thứ Tư_Chiều_3": {
    "1A1": "GDTC(T)", "1B": "T", "2A1": "TV", "2A": "TCTV(P)",
    "3A1": "BDAN", "3A2": "TNXH", "3B": "CN",
    "4A1": "KH(H)", "4A2": "TA(TR)", "4B": "GDTC(Th)",
    "5A1": "MT", "5A2": "Tin học", "5B": "LS&ĐL"
  },
  "Thứ Tư_Chiều_4": {
    "1A1": "", "1B": "", "2A1": "", "2A": "", "3A1": "", "3A2": "", "3B": "",
    "4A1": "", "4A2": "", "4B": "", "5A1": "", "5A2": "", "5B": ""
  },

  // THỨ NĂM (17/09/2026)
  "Thứ Năm_Sáng_1": {
    "1A1": "BDNK(T)", "1B": "Tiếng Việt", "2A1": "T", "2A": "T",
    "3A1": "T", "3A2": "TV", "3B": "T",
    "4A1": "T", "4A2": "T", "4B": "KH(H)",
    "5A1": "T", "5A2": "LS&ĐL(P)", "5B": "TA(TR)"
  },
  "Thứ Năm_Sáng_2": {
    "1A1": "TNXH(P)", "1B": "Tiếng Việt", "2A1": "TCT", "2A": "TV",
    "3A1": "TV", "3A2": "TV", "3B": "TV",
    "4A1": "TV", "4A2": "GDTC(Th)", "4B": "TA(TR)",
    "5A1": "TV", "5A2": "BDAN", "5B": "ĐĐ(H)"
  },
  "Thứ Năm_Sáng_3": {
    "1A1": "TCTV", "1B": "TCT(P)", "2A1": "TV", "2A": "BDAN",
    "3A1": "TCT", "3A2": "TA(Q)", "3B": "HĐTN(T)",
    "4A1": "TA(TR)", "4A2": "TV", "4B": "T",
    "5A1": "TV", "5A2": "GDTC(Th)", "5B": "CN(H)"
  },
  "Thứ Năm_Sáng_4": {
    "1A1": "BDAN", "1B": "TNXH(P)", "2A1": "TV", "2A": "TV",
    "3A1": "TA(Q)", "3A2": "T", "3B": "ĐĐ(H)",
    "4A1": "GDTC(Th)", "4A2": "TCTV", "4B": "TV",
    "5A1": "TCT", "5A2": "TA(TR)", "5B": "T"
  },
  "Thứ Năm_Sáng_5": {
    "1A1": "", "1B": "", "2A1": "", "2A": "", "3A1": "", "3A2": "", "3B": "",
    "4A1": "", "4A2": "", "4B": "", "5A1": "", "5A2": "", "5B": ""
  },

  "Thứ Năm_Chiều_1": {
    "1A1": "Tiếng Việt", "1B": "Tiếng Việt", "2A1": "TCT(P)", "2A": "GDTC(T)",
    "3A1": "TV", "3A2": "TCT", "3B": "TV",
    "4A1": "LS&ĐL(H)", "4A2": "HĐTN(Th)", "4B": "TV",
    "5A1": "TA(TR)", "5A2": "T", "5B": "Tin học"
  },
  "Thứ Năm_Chiều_2": {
    "1A1": "Tiếng Việt", "1B": "TCTV", "2A1": "TNXH(P)", "2A": "TV",
    "3A1": "TNXH(H)", "3A2": "HĐTN(T)", "3B": "TCT",
    "4A1": "TCTV", "4A2": "Tin học", "4B": "TCTV",
    "5A1": "GDTC(Th)", "5A2": "TV", "5B": "TA(TR)"
  },
  "Thứ Năm_Chiều_3": {
    "1A1": "T", "1B": "T", "2A1": "TCTV(P)", "2A": "TV",
    "3A1": "CN(H)", "3A2": "GDTC(T)", "3B": "TNXH",
    "4A1": "Tin học", "4A2": "TA(TR)", "4B": "LS&ĐL",
    "5A1": "LS&ĐL", "5A2": "KH(TB)", "5B": "GDTC(Th)"
  },
  "Thứ Năm_Chiều_4": {
    "1A1": "", "1B": "", "2A1": "", "2A": "", "3A1": "", "3A2": "", "3B": "",
    "4A1": "", "4A2": "", "4B": "", "5A1": "", "5A2": "", "5B": ""
  },

  // THỨ SÁU (18/09/2026)
  "Thứ Sáu_Sáng_1": {
    "1A1": "Tiếng Việt", "1B": "Tiếng Việt", "2A1": "MT", "2A": "T",
    "3A1": "T", "3A2": "T", "3B": "TA(TR)",
    "4A1": "T", "4A2": "T", "4B": "T",
    "5A1": "T", "5A2": "T", "5B": "T"
  },
  "Thứ Sáu_Sáng_2": {
    "1A1": "Tiếng Việt", "1B": "Tiếng Việt", "2A1": "BDAN", "2A": "TV",
    "3A1": "HĐTN", "3A2": "HĐTN", "3B": "T",
    "4A1": "TA(TR)", "4A2": "MT", "4B": "TV",
    "5A1": "HĐTN", "5A2": "TV", "5B": "TV"
  },
  "Thứ Sáu_Sáng_3": {
    "1A1": "Tiếng Việt", "1B": "HĐTN", "2A1": "T", "2A": "TV",
    "3A1": "MT", "3A2": "TA(Q)", "3B": "TCT",
    "4A1": "TV", "4A2": "LS&ĐL", "4B": "TV",
    "5A1": "BDAN", "5A2": "TA(TR)", "5B": "KH"
  },
  "Thứ Sáu_Sáng_4": {
    "1A1": "HĐTN", "1B": "BDAN", "2A1": "HĐTN", "2A": "HĐTN",
    "3A1": "TA(Q)", "3A2": "MT", "3B": "HĐTN",
    "4A1": "HĐTN", "4A2": "HĐTN", "4B": "HĐTN",
    "5A1": "TA(TR)", "5A2": "HĐTN", "5B": "HĐTN"
  },
  "Thứ Sáu_Sáng_5": {
    "1A1": "", "1B": "", "2A1": "", "2A": "", "3A1": "", "3A2": "", "3B": "",
    "4A1": "", "4A2": "", "4B": "", "5A1": "", "5A2": "", "5B": ""
  },

  "Thứ Sáu_Chiều_1": {
    "1A1": "", "1B": "", "2A1": "", "2A": "", "3A1": "", "3A2": "", "3B": "",
    "4A1": "", "4A2": "", "4B": "", "5A1": "", "5A2": "", "5B": ""
  },
  "Thứ Sáu_Chiều_2": {
    "1A1": "", "1B": "", "2A1": "", "2A": "", "3A1": "", "3A2": "", "3B": "",
    "4A1": "", "4A2": "", "4B": "", "5A1": "", "5A2": "", "5B": ""
  },
  "Thứ Sáu_Chiều_3": {
    "1A1": "SHCM", "1B": "SHCM", "2A1": "SHCM", "2A": "SHCM",
    "3A1": "SHCM", "3A2": "SHCM", "3B": "SHCM",
    "4A1": "SHCM", "4A2": "SHCM", "4B": "SHCM",
    "5A1": "SHCM", "5A2": "SHCM", "5B": "SHCM"
  },
  "Thứ Sáu_Chiều_4": {
    "1A1": "", "1B": "", "2A1": "", "2A": "", "3A1": "", "3A2": "", "3B": "",
    "4A1": "", "4A2": "", "4B": "", "5A1": "", "5A2": "", "5B": ""
  },
};

// Master timetable matrix based on the uploaded school timetable (THỰC HIỆN TỪ TUẦN 2 - 14/09/2026 - 18/09/2026)
export const DEFAULT_MASTER_TIMETABLE: MasterTimetable = {
  schoolName: "Trường Tiểu Học Tân Thạnh - Phân hiệu Tân Bình",
  effectiveDate: "Áp dụng Tuần 2 - Từ ngày 14 - 18/9/2026",
  version: "2026_v9_uploaded_tuan2_13classes",
  classes: DEFAULT_CLASSES,
  slots: TIMETABLE_TUAN_2_SLOTS,
};

export const DAYS_OF_WEEK: DayOfWeek[] = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu"];

// Academic Year 2026 - 2027 Start Date (Week 1 = Monday 07/09/2026)
export const ACADEMIC_YEAR_START_DATE = "07/09/2026";

export interface WeekDateRange {
  week: number;
  startDate: string; // dd/mm/yyyy (Monday / Thứ Hai)
  endDate: string;   // dd/mm/yyyy (Friday / Thứ Sáu)
  dates: string[];   // [T2, T3, T4, T5, T6] in "dd/mm/yyyy"
  datesShort: string[]; // [T2, T3, T4, T5, T6] in "dd/mm"
  label: string;
}

// Robust date string parser (accepts dd/mm/yyyy or dd-mm-yyyy)
export function parseDateString(dateStr: string): Date {
  if (!dateStr) return new Date(2026, 8, 7);
  const parts = dateStr.split(/[\/\-]/);
  if (parts.length >= 2) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parts[2] ? parseInt(parts[2], 10) : 2026;
    if (!isNaN(day) && !isNaN(month)) {
      return new Date(year, month - 1, day);
    }
  }
  return new Date(2026, 8, 7);
}

// Calculate the precise 5-day school week range (Monday to Friday) for any week (1 to 35)
// Week 1 = 07/09/2026 ... Week 2 = 14/09/2026 ... Week 35 = 03/05/2027
export function calculateWeekDateRange(
  week: number = 1,
  baseDateStr: string = ACADEMIC_YEAR_START_DATE
): WeekDateRange {
  const safeWeek = Math.max(1, Math.min(35, isNaN(week) ? 1 : Math.round(week)));
  const baseStart = parseDateString(baseDateStr);

  // Calculate Monday date of the requested week
  const monday = new Date(baseStart);
  monday.setDate(baseStart.getDate() + (safeWeek - 1) * 7);

  const dates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  });

  const datesShort = dates.map((d) => d.substring(0, 5));
  const startDate = dates[0];
  const endDate = dates[4];

  return {
    week: safeWeek,
    startDate,
    endDate,
    dates,
    datesShort,
    label: `Tuần ${safeWeek} (${datesShort[0]} - ${datesShort[4]})`,
  };
}

// Helper to calculate weekly dates (Monday to Friday)
// Automatically synchronizes based on the week number (Week 1 = 07/09/2026, Week 2 = 14/09/2026, ..., Week 35 = 03/05/2027)
export function getWeekDates(
  startDateOrWeek?: string | number,
  explicitWeek?: number
): string[] {
  // 1. Direct week number passed as first parameter: getWeekDates(2) -> Week 2 dates
  if (typeof startDateOrWeek === "number") {
    return calculateWeekDateRange(startDateOrWeek).dates;
  }

  // 2. Explicit week number provided as second parameter: getWeekDates(startDateStr, week)
  if (typeof explicitWeek === "number" && explicitWeek >= 1 && explicitWeek <= 35) {
    if (typeof startDateOrWeek === "string" && startDateOrWeek.trim() !== "") {
      const cleanDate = startDateOrWeek.trim();
      // If caller passed the academic year start (07/09/2026) while week > 1, use the calculated week
      if (cleanDate === ACADEMIC_YEAR_START_DATE && explicitWeek > 1) {
        return calculateWeekDateRange(explicitWeek).dates;
      }
      // If the provided date is a specific Monday date (e.g., "14/09/2026" for week 2 or custom Monday),
      // compute 5 consecutive school days (Thứ 2 -> Thứ 6) directly from this base date without double-offsetting!
      const base = parseDateString(cleanDate);
      return Array.from({ length: 5 }, (_, i) => {
        const d = new Date(base);
        d.setDate(base.getDate() + i);
        const dd = String(d.getDate()).padStart(2, "0");
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const yyyy = d.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
      });
    }
    return calculateWeekDateRange(explicitWeek).dates;
  }

  // 3. String provided without explicit week: calculate 5 consecutive school days from this date
  if (typeof startDateOrWeek === "string" && startDateOrWeek.trim() !== "") {
    const base = parseDateString(startDateOrWeek.trim());
    return Array.from({ length: 5 }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      const dd = String(d.getDate()).padStart(2, "0");
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const yyyy = d.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    });
  }

  return calculateWeekDateRange(1).dates;
}

// Check if a cell slot matches a specialist teacher or subject
export function isSlotMatchingTeacherOrSubject(
  cellText: string,
  teacherName: string,
  specialistSubject?: string
): boolean {
  if (!cellText || cellText.trim() === "" || cellText === "SHCM") return false;
  const lowerCell = cellText.toLowerCase();
  const lowerName = teacherName.toLowerCase();

  // Match specialist teacher tags from parentheses in uploaded timetable
  if (lowerName.includes("trinh") || lowerName.includes("trí")) {
    return lowerCell.includes("(tr)") || lowerCell.includes("tr)") || lowerCell.includes("(trinh)") || (lowerCell.includes("ta") && !lowerCell.includes("(q)"));
  }
  if (lowerName.includes("quỳnh") || lowerName.includes("quynh")) {
    return lowerCell.includes("(q)") || lowerCell.includes("q)") || lowerCell.includes("(quỳnh)");
  }
  if (lowerName.includes("thảo") || lowerName.includes("thao")) {
    return lowerCell.includes("(t)") || lowerCell.includes("gdtc(t)") || lowerCell.includes("hdtn(t)") || lowerCell.includes("bdnk") || lowerCell.includes("(thảo)");
  }
  if (lowerName.includes("thịnh")) {
    return lowerCell.includes("(th)") || lowerCell.includes("(thịnh)") || lowerCell.includes("th)") || lowerCell.includes("gdtc(th)") || lowerCell.includes("hdtn(th)");
  }
  if (lowerName.includes("phượng") || lowerName.includes("phuong")) {
    return lowerCell.includes("(p)") || lowerCell.includes("p)") || lowerCell.includes("(phượng)") || lowerCell.includes("(p)");
  }
  if (lowerName.includes("huế") || lowerName.includes("hue")) {
    return lowerCell.includes("(h)") || lowerCell.includes("h)") || lowerCell.includes("(huế)");
  }
  if (lowerName.includes("tân bình") || lowerName.includes("tan binh") || lowerName.includes("tb")) {
    return lowerCell.includes("(tb)") || lowerCell.includes("tb)");
  }
  if (lowerName.includes("phương") && (specialistSubject?.toLowerCase().includes("tin") || !lowerName.includes("phượng"))) {
    return lowerCell.includes("tin học") || lowerCell.includes("th") || lowerCell.includes("(phương)");
  }
  if (lowerName.includes("nương")) {
    return lowerCell.includes("(nương)") || lowerCell.includes("nương");
  }
  if (lowerName.includes("chi")) {
    return lowerCell.includes("(chi)") || lowerCell.includes("chi");
  }
  if (lowerName.includes("thy")) {
    return lowerCell.includes("(thy)") || lowerCell.includes("thy") || lowerCell.includes("mt");
  }
  if (lowerName.includes("tâm")) {
    return lowerCell.includes("(tâm)") || lowerCell.includes("tâm") || lowerCell.includes("an") || lowerCell.includes("bdan");
  }
  if (lowerName.includes("phước")) {
    return lowerCell.includes("(phước)") || lowerCell.includes("phước");
  }
  if (lowerName.includes("nhàn")) {
    return lowerCell.includes("(nhàn)") || lowerCell.includes("nhàn");
  }
  if (lowerName.includes("quan")) {
    return lowerCell.includes("(quan)") || lowerCell.includes("quan");
  }

  // Check matching by specialist subject keywords
  if (specialistSubject) {
    const sSub = specialistSubject.toLowerCase();
    if (sSub.includes("tiếng anh") || sSub.includes("anh văn")) {
      return lowerCell.includes("ta(tr)") || lowerCell.includes("ta(q)") || lowerCell.includes("tiếng anh") || lowerCell.includes("ta");
    }
    if (sSub.includes("tin học")) {
      return lowerCell.includes("tin học") || lowerCell.includes("th (phương)") || lowerCell.includes("th");
    }
    if (sSub.includes("âm nhạc")) {
      return lowerCell.includes("an") || lowerCell.includes("bdan") || lowerCell.includes("âm nhạc");
    }
    if (sSub.includes("mĩ thuật") || sSub.includes("mỹ thuật")) {
      return lowerCell.includes("mt") || lowerCell.includes("mĩ thuật") || lowerCell.includes("bdmt");
    }
    if (sSub.includes("thể chất") || sSub.includes("gdtc")) {
      return lowerCell.includes("gdtc") || lowerCell.includes("bdnk") || lowerCell.includes("thể chất");
    }
  }

  // General tag match
  const nameParts = lowerName.split(" ");
  const lastName = nameParts[nameParts.length - 1];
  if (lastName && (lowerCell.includes(`(${lastName})`) || lowerCell.includes(lastName))) {
    return true;
  }

  return false;
}

// Helper to categorize subject shorthand for sequential weekly period counting
export function getSubjectCategory(raw: string, day: DayOfWeek, period: number): string {
  const clean = raw.trim();
  const cUpper = clean.toUpperCase();
  const cLower = clean.toLowerCase();

  // 1. Chào cờ / Sinh hoạt dưới cờ (HĐTN)
  if (
    cUpper.includes("HĐTN (CC)") ||
    cUpper.includes("HDTN (CC)") ||
    clean === "CC" ||
    cLower.includes("chào cờ") ||
    cLower.includes("chao co") ||
    cUpper.includes("SHDC") ||
    ((cUpper.includes("HĐTN") || cUpper.includes("HDTN")) && day === "Thứ Hai" && period === 1)
  ) {
    return "HDTN_SHDC";
  }

  // 2. Sinh hoạt lớp (HĐTN)
  if (
    cUpper.includes("HĐTN (SHL)") ||
    cUpper.includes("HDTN (SHL)") ||
    clean === "SHL" ||
    cLower.includes("sinh hoạt lớp") ||
    cLower.includes("sinh hoat lop") ||
    ((cUpper.includes("HĐTN") || cUpper.includes("HDTN")) && day === "Thứ Sáu" && (period === 4 || period === 5 || period === 2 || period === 3))
  ) {
    return "HDTN_SHL";
  }

  // 3. Hoạt động trải nghiệm chủ đề
  if (cUpper.includes("HĐTN") || cUpper.includes("HDTN") || cLower.includes("hoạt động trải nghiệm") || cLower.includes("trai nghiem")) {
    return "HDTN_GDCD";
  }

  // 4. Kĩ năng sống
  if (cUpper.includes("KNS") || cLower.includes("kĩ năng sống") || cLower.includes("kỹ năng sống")) {
    return "KNS";
  }

  // 5. Tăng cường / Luyện Tiếng Việt (TCTV)
  if (
    cUpper.includes("TCTV") ||
    cUpper.includes("T. CƯỜNG TV") ||
    cUpper.includes("T.CƯỜNG TV") ||
    cLower.includes("luyện tiếng việt") ||
    cLower.includes("luyện tv") ||
    cLower.includes("tăng cường tiếng việt") ||
    cLower.includes("ôn tiếng việt")
  ) {
    return "TCTV";
  }

  // 6. Tăng cường / Luyện Toán (TCT)
  if (
    cUpper.includes("TCT") ||
    cUpper.includes("T. CƯỜNG T") ||
    cUpper.includes("T.CƯỜNG T") ||
    cLower.includes("luyện toán") ||
    cLower.includes("luyện t") ||
    cLower.includes("tăng cường toán") ||
    cLower.includes("ôn toán")
  ) {
    return "TCT";
  }

  // 7. Tiếng Anh
  if (cUpper.includes("TA") || cLower.includes("tiếng anh") || cLower.includes("anh văn") || cLower.includes("english")) {
    return "TA";
  }

  // 8. Tin học
  if (cUpper.includes("TH") || cLower.includes("tin học") || cLower.includes("t.học") || cLower.includes("tin hoc")) {
    return "TH";
  }

  // 9. Công nghệ
  if (clean === "CN" || clean.startsWith("CN ") || cLower.includes("công nghệ") || cLower.includes("cong nghe")) {
    return "CN";
  }

  // 10. Giáo dục Thể chất / Thể dục
  if (cUpper.includes("GDTC") || cLower.includes("thể chất") || cLower.includes("thể dục") || clean === "TD" || cUpper.includes("THỂ CHẤT")) {
    return "GDTC";
  }

  // 11. Âm nhạc
  if (cUpper.includes("AN") || cLower.includes("âm nhạc") || cUpper.includes("BDAN") || cLower.includes("am nhac")) {
    return "AN";
  }

  // 12. Mĩ thuật
  if (cUpper.includes("MT") || cLower.includes("mĩ thuật") || cLower.includes("mỹ thuật") || cUpper.includes("BDMT")) {
    return "MT";
  }

  // 13. Tự nhiên và Xã hội
  if (cUpper.includes("TNXH") || cUpper.includes("TN&XH") || cLower.includes("tự nhiên và xã hội") || cLower.includes("tự nhiên & xã hội")) {
    return "TNXH";
  }

  // 14. Lịch sử và Địa lí
  if (cUpper.includes("LS-ĐL") || cUpper.includes("LS&ĐL") || clean === "LS" || clean === "ĐL" || cLower.includes("lịch sử") || cLower.includes("địa lí") || cLower.includes("địa lý")) {
    return "LSDL";
  }

  // 15. Khoa học
  if (clean === "KH" || cLower.includes("khoa học") || cLower.includes("khoa hoc")) {
    return "KH";
  }

  // 16. Đạo đức
  if (cUpper.includes("ĐĐ") || cLower.includes("đạo đức") || cLower.includes("dao duc")) {
    return "DD";
  }

  // 17. Giáo dục địa phương
  if (cUpper.includes("GDĐP") || cLower.includes("địa phương") || cLower.includes("gdđp")) {
    return "GDDP";
  }

  // 18. Tiếng Việt chính khóa
  if (clean === "TV" || clean.startsWith("TV ") || cLower.includes("tiếng việt") || cLower === "tv") {
    return "TV";
  }

  // 19. Toán chính khóa
  if (clean === "T" || clean.startsWith("T ") || cLower.includes("toán") || cLower === "t") {
    return "TOAN";
  }

  return clean;
}

// Helper to generate full weekly schedule items for a specific class (GVCN)
export function generateScheduleForClass(
  master: MasterTimetable,
  targetClass: string,
  week: number = 1,
  startDateStr?: string,
  teacherName: string = "Cô Ngân"
): ScheduleItem[] {
  const items: ScheduleItem[] = [];
  const dates = getWeekDates(startDateStr, week);
  const subjectCounters: Record<string, number> = {};

  const cleanClass = targetClass.trim().toUpperCase();

  DAYS_OF_WEEK.forEach((day, dIdx) => {
    // Sáng (Tiết 1 -> 5)
    for (let p = 1; p <= 5; p++) {
      const key = `${day}_Sáng_${p}`;
      const slotRow = master.slots[key] || {};
      const subjectRaw = (
        slotRow[targetClass] ||
        slotRow[cleanClass] ||
        slotRow[targetClass.toLowerCase()] ||
        (cleanClass === "1A1" ? (slotRow["1A1"] || slotRow["1A"]) : "") ||
        (cleanClass === "1A" ? (slotRow["1A1"] || slotRow["1A"]) : "") ||
        (cleanClass === "2A" ? (slotRow["2A"] || slotRow["2A2"] || slotRow["2A1"]) : "") ||
        (cleanClass === "2A2" ? (slotRow["2A"] || slotRow["2A2"]) : "") ||
        (cleanClass === "3A1" ? (slotRow["3A1"] || slotRow["3A"]) : "") ||
        (cleanClass === "3A" ? (slotRow["3A1"] || slotRow["3A"]) : "") ||
        (cleanClass === "4A1" ? (slotRow["4A1"] || slotRow["4A"]) : "") ||
        (cleanClass === "4A" ? (slotRow["4A1"] || slotRow["4A"]) : "") ||
        (cleanClass === "5A1" ? (slotRow["5A1"] || slotRow["5A"]) : "") ||
        (cleanClass === "5A" ? (slotRow["5A1"] || slotRow["5A"]) : "") ||
        (cleanClass === "5B" ? (slotRow["5B"] || slotRow["5 B"]) : "") ||
        ""
      ).trim();
      if (subjectRaw && subjectRaw !== "") {
        const cat = getSubjectCategory(subjectRaw, day, p);
        subjectCounters[cat] = (subjectCounters[cat] || 0) + 1;
        const pInW = subjectCounters[cat];

        const item = mapRawSubjectToScheduleItem(
          subjectRaw,
          day,
          dates[dIdx],
          "Sáng",
          p,
          targetClass,
          week,
          teacherName,
          undefined,
          pInW
        );
        if (item) items.push(item);
      }
    }

    // Chiều (Tiết 1 -> 4)
    for (let p = 1; p <= 4; p++) {
      const key = `${day}_Chiều_${p}`;
      const slotRow = master.slots[key] || {};
      const subjectRaw = (
        slotRow[targetClass] ||
        slotRow[cleanClass] ||
        slotRow[targetClass.toLowerCase()] ||
        (cleanClass === "1A1" ? (slotRow["1A1"] || slotRow["1A"]) : "") ||
        (cleanClass === "1A" ? (slotRow["1A1"] || slotRow["1A"]) : "") ||
        (cleanClass === "2A" ? (slotRow["2A"] || slotRow["2A2"] || slotRow["2A1"]) : "") ||
        (cleanClass === "2A2" ? (slotRow["2A"] || slotRow["2A2"]) : "") ||
        (cleanClass === "3A1" ? (slotRow["3A1"] || slotRow["3A"]) : "") ||
        (cleanClass === "3A" ? (slotRow["3A1"] || slotRow["3A"]) : "") ||
        (cleanClass === "4A1" ? (slotRow["4A1"] || slotRow["4A"]) : "") ||
        (cleanClass === "4A" ? (slotRow["4A1"] || slotRow["4A"]) : "") ||
        (cleanClass === "5A1" ? (slotRow["5A1"] || slotRow["5A"]) : "") ||
        (cleanClass === "5A" ? (slotRow["5A1"] || slotRow["5A"]) : "") ||
        (cleanClass === "5B" ? (slotRow["5B"] || slotRow["5 B"]) : "") ||
        ""
      ).trim();
      if (subjectRaw && subjectRaw !== "") {
        const cat = getSubjectCategory(subjectRaw, day, p);
        subjectCounters[cat] = (subjectCounters[cat] || 0) + 1;
        const pInW = subjectCounters[cat];

        const item = mapRawSubjectToScheduleItem(
          subjectRaw,
          day,
          dates[dIdx],
          "Chiều",
          p,
          targetClass,
          week,
          teacherName,
          undefined,
          pInW
        );
        if (item) items.push(item);
      }
    }
  });

  return items;
}

// Helper to generate full weekly schedule items for a Specialist Teacher (GV Chuyên Bộ Môn)
export function generateSpecialistSchedule(
  master: MasterTimetable,
  teacherName: string,
  specialistSubject: string,
  week: number = 1,
  startDateStr?: string,
  assignedClasses: string[] = DEFAULT_CLASSES
): ScheduleItem[] {
  const items: ScheduleItem[] = [];
  const dates = getWeekDates(startDateStr, week);
  const classSubjectCounters: Record<string, Record<string, number>> = {};

  DAYS_OF_WEEK.forEach((day, dIdx) => {
    // Sáng (Tiết 1 -> 5)
    for (let p = 1; p <= 5; p++) {
      const key = `${day}_Sáng_${p}`;
      const slotRow = master.slots[key] || {};

      assignedClasses.forEach((cls) => {
        const cell = (slotRow[cls] || "").trim();
        if (cell && isSlotMatchingTeacherOrSubject(cell, teacherName, specialistSubject)) {
          if (!classSubjectCounters[cls]) classSubjectCounters[cls] = {};
          const cat = getSubjectCategory(cell, day, p);
          classSubjectCounters[cls][cat] = (classSubjectCounters[cls][cat] || 0) + 1;
          const pInW = classSubjectCounters[cls][cat];

          const item = mapRawSubjectToScheduleItem(
            cell,
            day,
            dates[dIdx],
            "Sáng",
            p,
            cls,
            week,
            teacherName,
            specialistSubject,
            pInW
          );
          if (item) items.push(item);
        }
      });
    }

    // Chiều (Tiết 1 -> 4)
    for (let p = 1; p <= 4; p++) {
      const key = `${day}_Chiều_${p}`;
      const slotRow = master.slots[key] || {};

      assignedClasses.forEach((cls) => {
        const cell = (slotRow[cls] || "").trim();
        if (cell && cell !== "SHCM" && isSlotMatchingTeacherOrSubject(cell, teacherName, specialistSubject)) {
          if (!classSubjectCounters[cls]) classSubjectCounters[cls] = {};
          const cat = getSubjectCategory(cell, day, p);
          classSubjectCounters[cls][cat] = (classSubjectCounters[cls][cat] || 0) + 1;
          const pInW = classSubjectCounters[cls][cat];

          const item = mapRawSubjectToScheduleItem(
            cell,
            day,
            dates[dIdx],
            "Chiều",
            p,
            cls,
            week,
            teacherName,
            specialistSubject,
            pInW
          );
          if (item) items.push(item);
        }
      });
    }
  });

  return items;
}

// Unified weekly schedule generator based on SchoolInfo
export function generateWeeklyScheduleFromTimetable(
  master: MasterTimetable,
  targetClass: string,
  teacherName: string,
  week: number,
  startDateStr: string,
  teacherType: "homeroom" | "specialist" = "homeroom",
  specialistSubject: string = "Tiếng Anh",
  assignedClasses: string[] = DEFAULT_CLASSES
): ScheduleItem[] {
  if (teacherType === "specialist") {
    return generateSpecialistSchedule(master, teacherName, specialistSubject, week, startDateStr, assignedClasses);
  }
  return generateScheduleForClass(master, targetClass, week, startDateStr, teacherName);
}

// Helper to detect specialist teacher short display name
export function getSpecialistTeacherShortName(item: {
  subject?: string;
  subSubject?: string;
  note?: string;
  lessonTitle?: string;
  raw?: string;
}): string | null {
  const sub = (item.subject || "").toUpperCase();
  const raw = (item.raw || "").toUpperCase();
  const note = (item.note || "").toUpperCase();

  if (raw.includes("(TR)") || note.includes("TRINH") || raw.includes("TRINH")) {
    return "Cô Trinh";
  }
  if (raw.includes("(Q)") || note.includes("QUỲNH") || raw.includes("QUYNH")) {
    return "Cô Quỳnh";
  }
  if (raw.includes("(TH)") || note.includes("THỊNH") || raw.includes("THINH") || raw.includes("GDTC(TH)") || raw.includes("HĐTN(TH)")) {
    return "Thầy Thịnh";
  }
  if (raw.includes("(T)") || note.includes("THẢO") || raw.includes("THAO") || raw.includes("GDTC(T)") || raw.includes("HĐTN(T)") || raw.includes("BDNK")) {
    return "Thầy Thảo";
  }
  if (raw.includes("(P)") || raw.includes("(P)") || note.includes("PHƯỢNG") || raw.includes("PHUONG")) {
    return "Cô Phượng";
  }
  if (raw.includes("(H)") || note.includes("HUẾ") || raw.includes("HUE")) {
    return "Cô Huế";
  }
  if (raw.includes("(TB)") || note.includes("TÂN BÌNH") || note.includes("TAN BINH")) {
    return "Thầy/Cô Tân Bình";
  }
  if (raw.includes("TIN HỌC") || sub.includes("TIN HỌC") || sub === "TH" || raw.includes("(PHƯƠNG)")) {
    return "Thầy Phương";
  }
  if (raw.includes("MT") || sub.includes("MĨ THUẬT") || sub === "MT" || raw.includes("(THY)")) {
    return "Thầy Thy";
  }
  if (raw.includes("AN") || raw.includes("BDAN") || sub.includes("ÂM NHẠC") || sub === "AN" || raw.includes("(TÂM)")) {
    return "Cô Tâm";
  }
  if (raw.includes("(NHÀN)") || note.includes("NHÀN")) {
    return "Thầy Nhàn";
  }
  if (raw.includes("(PHƯỚC)") || note.includes("PHƯỚC")) {
    return "Thầy Phước";
  }
  if (raw.includes("(QUAN)") || note.includes("QUAN")) {
    return "Thầy Quan";
  }

  return null;
}

// Helper to map shorthand cell string to detailed Lesson Plan Item
export function mapRawSubjectToScheduleItem(
  raw: string,
  day: DayOfWeek,
  dateStr: string,
  session: SessionType,
  period: number,
  className: string,
  week: number,
  teacherName: string,
  specialistSubject?: string,
  subjectPeriodInWeek?: number
): ScheduleItem {
  const clean = raw.trim();
  const gradeNum = ((parseInt(className.charAt(0)) as Grade) || 5) as Grade;

  let subject = `TIẾNG VIỆT ${gradeNum}`;
  let subSubject = "";
  let lessonTitle = clean;
  let curriculumPeriod: string | number = week * 4 + period;
  let integrationNotes = "";
  let note = "";

  // 1. Detect Teacher Annotation Note from parenthesis in uploaded timetable
  if (clean.includes("(TR)") || clean.includes("TA(TR)")) {
    note = "GV Chuyên TA: Cô Trinh";
  } else if (clean.includes("(Q)") || clean.includes("TA(Q)")) {
    note = "GV Chuyên TA: Cô Quỳnh";
  } else if (clean.includes("(Th)") || clean.includes("(TH)") || clean.includes("GDTC(Th)") || clean.includes("HĐTN(Th)")) {
    note = "GV Chuyên GDTC: Thầy Thịnh";
  } else if (clean.includes("(T)") || clean.includes("GDTC(T)") || clean.includes("HĐTN(T)") || clean.includes("BDNK")) {
    note = "GV Chuyên GDTC: Thầy Thảo";
  } else if (clean.includes("(P)") || clean.includes("(p)")) {
    note = "GV Bộ môn: Cô Phượng";
  } else if (clean.includes("(H)")) {
    note = "GV Bộ môn: Cô Huế";
  } else if (clean.includes("(TB)")) {
    note = "GV Bộ môn: Phân hiệu Tân Bình";
  } else if (clean.includes("(Thịnh)")) {
    note = "GV Chuyên GDTC: Thầy Thịnh";
  } else if (clean.includes("(Nương)")) {
    note = "GV Chuyên TA: Cô Nương";
  } else if (clean.includes("(Phương)")) {
    note = "GV Chuyên TH: Thầy Phương";
  } else if (clean.includes("(Thy)")) {
    note = "GV Chuyên MT: Thầy Thy";
  } else if (clean.includes("(Tâm)")) {
    note = "GV Chuyên AN: Cô Tâm";
  } else if (clean.includes("(Phước)")) {
    note = "GV Bộ môn: Thầy Phước";
  } else if (clean.includes("(Nhàn)")) {
    note = "GV Bộ môn: Thầy Nhàn";
  } else if (clean.includes("(Quan)")) {
    note = "PHT: Phan Ngọc Quan";
  }

  // 2. BỒI DƯỠNG NĂNG KHIẾU (BDNK)
  if (clean.includes("BDNK")) {
    subject = `GIÁO DỤC THỂ CHẤT ${gradeNum}`;
    subSubject = "Bồi dưỡng năng khiếu";
    lessonTitle = "Bồi dưỡng Năng khiếu Thể chất: Rèn luyện thể lực và tư thế cơ bản";
    curriculumPeriod = `BDNK${week}`;
    if (!note) note = "GV Chuyên GDTC: Thầy Thảo";
    integrationNotes = "Rèn luyện thể lực, tính kiên trì và tinh thần đồng đội.";
  }

  // 3. TIẾNG ANH (TA)
  else if ((clean.includes("TA") || clean.includes("Anh văn") || clean.includes("Tiếng Anh")) && !clean.includes("HĐTN") && !clean.includes("HDTN")) {
    subject = `TIẾNG ANH ${gradeNum}`;
    if (!note) {
      note = clean.includes("(Q)") ? "GV Chuyên TA: Cô Quỳnh" : "GV Chuyên TA: Cô Trinh";
    }
    const pInW = subjectPeriodInWeek || ((period % 4) + 1);
    const englishDetail = getDetailedEnglishLesson(gradeNum, week, undefined, pInW);
    lessonTitle = englishDetail.lessonTitle;
    curriculumPeriod = (week - 1) * 4 + ((pInW - 1) % 4) + 1;
    integrationNotes = englishDetail.integrationNotes;
  }

  // 4. TIN HỌC (TH)
  else if ((clean.includes("TH") || clean.includes("T.học") || clean.includes("Tin học")) && !clean.includes("CN") && !clean.includes("HĐTN") && !clean.includes("HDTN")) {
    subject = `TIN HỌC ${gradeNum}`;
    if (!note) note = "GV Chuyên TH: Thầy Phương";
    const pInW = subjectPeriodInWeek || ((period % 2) + 1);
    const info = getGradeCurriculumLesson(gradeNum, "Tin học", week, pInW);
    lessonTitle = info.lessonTitle;
    curriculumPeriod = info.curriculumPeriod;
    integrationNotes = info.integrationNotes || "";
  }

  // 5. CÔNG NGHỆ (CN)
  else if (clean === "CN" || clean.startsWith("CN ") || clean.includes("Công nghệ") || clean.includes("CN(H)") || clean.includes("CN(TB)")) {
    subject = `CÔNG NGHỆ ${gradeNum}`;
    const pInW = subjectPeriodInWeek || 1;
    const info = getGradeCurriculumLesson(gradeNum, "công nghệ", week, pInW);
    lessonTitle = info.lessonTitle;
    curriculumPeriod = info.curriculumPeriod;
    integrationNotes = info.integrationNotes || "";
  }

  // 6. ÂM NHẠC (AN / BDAN)
  else if ((clean.includes("AN") || clean.includes("Âm nhạc") || clean.includes("BDAN")) && !clean.includes("HĐTN") && !clean.includes("HDTN") && !clean.includes("Quan")) {
    subject = `ÂM NHẠC ${gradeNum}`;
    const isEnhance = clean.includes("BDAN") || clean.includes("Bồi dưỡng") || session === "Chiều";
    subSubject = isEnhance ? "Bồi dưỡng Âm nhạc" : "Âm nhạc";
    if (!note) note = "GV Chuyên AN: Cô Tâm";
    const musicDetail = getDetailedMusicLesson(gradeNum, week, isEnhance, session as any);
    lessonTitle = musicDetail.lessonTitle;
    curriculumPeriod = isEnhance ? `BD${week}` : week;
    integrationNotes = musicDetail.integrationNotes;
  }

  // 7. MĨ THUẬT (MT / BDMT)
  else if ((clean.includes("MT") || clean.includes("Mĩ thuật") || clean.includes("BDMT")) && !clean.includes("HĐTN") && !clean.includes("HDTN")) {
    subject = `MĨ THUẬT ${gradeNum}`;
    const isEnhance = clean.includes("BDMT") || clean.includes("Bồi dưỡng");
    subSubject = isEnhance ? "Bồi dưỡng Mĩ thuật" : "Mĩ thuật";
    if (!note) note = "GV Chuyên MT: Thầy Thy";
    const pInW = subjectPeriodInWeek || 1;
    const info = getGradeCurriculumLesson(gradeNum, "Mĩ thuật", week, pInW);
    lessonTitle = info.lessonTitle;
    curriculumPeriod = info.curriculumPeriod;
    integrationNotes = info.integrationNotes || "";
  }

  // 8. GIÁO DỤC THỂ CHẤT / THỂ DỤC (GDTC, TD)
  else if (
    (clean.includes("GDTC") || clean.toLowerCase().includes("thể chất") || clean.toLowerCase().includes("thể dục") || clean === "TD") &&
    !clean.includes("HĐTN") && !clean.includes("HDTN")
  ) {
    subject = `GIÁO DỤC THỂ CHẤT ${gradeNum}`;
    subSubject = gradeNum === 5 ? "Thể dục" : "Giáo dục thể chất";
    if (!note) {
      note = clean.includes("(Th)") ? "GV Chuyên GDTC: Thầy Thịnh" : "GV Chuyên GDTC: Thầy Thảo";
    }
    const pInW = subjectPeriodInWeek || ((period % 2) + 1);
    const info = getGradeCurriculumLesson(gradeNum, "Giáo dục thể chất", week, pInW);
    lessonTitle = info.lessonTitle;
    curriculumPeriod = info.curriculumPeriod;
    integrationNotes = info.integrationNotes || "";
  }

  // 9. HOẠT ĐỘNG TRẢI NGHIỆM (HĐTN)
  // 9a. Chào cờ / Sinh hoạt dưới cờ (Thứ Hai Tiết 1)
  else if (
    clean.includes("HĐTN (CC)") ||
    clean.includes("HDTN (CC)") ||
    clean === "CC" ||
    clean.toLowerCase().includes("chào cờ") ||
    clean.toLowerCase().includes("sinh hoạt dưới cờ") ||
    clean.toUpperCase().includes("SHDC") ||
    ((clean.includes("HĐTN") || clean.includes("HDTN")) && day === "Thứ Hai" && period === 1)
  ) {
    subject = "HĐTN";
    subSubject = "Sinh hoạt dưới cờ";
    if (!note) note = "Chào cờ đầu tuần";
    curriculumPeriod = (week - 1) * 3 + 1;
    const info = getGradeCurriculumLesson(gradeNum, "hoạt động trải nghiệm", week, 1);
    lessonTitle = `HĐTN - SHDC: ${info.lessonTitle.replace(/^(sinh hoạt dưới cờ|shdc)[:–-]?\s*/i, "").trim()}`;
    integrationNotes = "Tích hợp QCN, KNS, Giáo dục truyền thống";
  } 
  // 9b. Sinh hoạt lớp (Thứ Sáu HĐTN)
  else if (
    clean.includes("HĐTN (SHL)") ||
    clean.includes("HDTN (SHL)") ||
    clean === "SHL" ||
    clean.toLowerCase().includes("sinh hoạt lớp") ||
    ((clean.includes("HĐTN") || clean.includes("HDTN")) && day === "Thứ Sáu" && (period === 4 || period === 5 || period === 2 || period === 3))
  ) {
    subject = "HĐTN";
    subSubject = "Sinh hoạt lớp";
    note = "Sinh hoạt cuối tuần";
    curriculumPeriod = (week - 1) * 3 + 3;
    const rawTitle = getShlAtgtLessonTitleForLbg(gradeNum, week);
    lessonTitle = rawTitle.replace(/^sinh hoạt lớp:\s*/i, "HĐTN - SHL: ");
    integrationNotes = "Tích hợp Giáo dục kỹ năng sống, quản lý cảm xúc bản thân và Giáo dục Văn hóa giao thông an toàn.";
  } 
  // 9c. Hoạt động giáo dục theo chủ đề
  else if (clean.includes("HĐTN") || clean.includes("HDTN") || clean.toLowerCase().includes("trải nghiệm")) {
    subject = "HĐTN";
    subSubject = "Hoạt động giáo dục theo chủ đề";
    curriculumPeriod = (week - 1) * 3 + 2;
    if (!note && clean.includes("(Th)")) note = "GV Chuyên: Thầy Thịnh";
    if (!note && clean.includes("(T)")) note = "GV Chuyên: Thầy Thảo";
    const info = getGradeCurriculumLesson(gradeNum, "hoạt động trải nghiệm", week, 2);
    lessonTitle = info.lessonTitle;
    integrationNotes = info.integrationNotes || "";
  }

  // 10. KĨ NĂNG SỐNG (KNS)
  else if (clean.toUpperCase().includes("KNS") || clean.toLowerCase().includes("kĩ năng sống") || clean.toLowerCase().includes("kỹ năng sống")) {
    subject = `KĨ NĂNG SỐNG ${gradeNum}`;
    subSubject = "Kĩ năng sống";
    const pInW = subjectPeriodInWeek || 1;
    lessonTitle = `Giáo dục Kĩ năng sống tuần ${week}: Kĩ năng tự phục vụ và giao tiếp văn minh`;
    curriculumPeriod = `KNS${pInW}`;
    integrationNotes = "";
  }

  // 11. LỊCH SỬ VÀ ĐỊA LÍ (LS-ĐL, LS, ĐL)
  else if (
    clean.includes("LS-ĐL") ||
    clean.includes("LS&ĐL") ||
    clean === "LS" ||
    clean === "ĐL" ||
    clean.toLowerCase().includes("lịch sử") ||
    clean.toLowerCase().includes("địa lí") ||
    clean.toLowerCase().includes("địa lý")
  ) {
    subject = `LỊCH SỬ VÀ ĐỊA LÍ ${gradeNum}`;
    subSubject = clean.includes("ĐL") && !clean.includes("LS") ? "Địa lí" : (clean.includes("LS") && !clean.includes("ĐL") ? "Lịch sử" : "Lịch sử và Địa lí");
    const pInW = subjectPeriodInWeek || ((day === "Thứ Hai" || day === "Thứ Ba") ? 1 : 2);
    const info = getGradeCurriculumLesson(gradeNum, "lịch sử và địa lí", week, pInW);
    lessonTitle = info.lessonTitle;
    curriculumPeriod = info.curriculumPeriod;
    integrationNotes = info.integrationNotes || "";
  }

  // 12. TỰ NHIÊN VÀ XÃ HỘI (TNXH)
  else if (
    clean.toUpperCase().includes("TNXH") ||
    clean.toUpperCase().includes("TN&XH") ||
    clean.toLowerCase().includes("tự nhiên và xã hội") ||
    clean.toLowerCase().includes("tự nhiên & xã hội") ||
    clean.toLowerCase().includes("tu nhien va xa hoi")
  ) {
    subject = `TỰ NHIÊN VÀ XÃ HỘI ${gradeNum}`;
    if (!note && clean.includes("(P)")) note = "GV Bộ môn: Cô Phượng";
    if (!note && clean.includes("(H)")) note = "GV Bộ môn: Cô Huế";
    const pInW = subjectPeriodInWeek || ((day === "Thứ Hai" || day === "Thứ Ba") ? 1 : 2);
    const info = getGradeCurriculumLesson(gradeNum, "tự nhiên và xã hội", week, pInW);
    lessonTitle = info.lessonTitle;
    curriculumPeriod = info.curriculumPeriod;
    integrationNotes = info.integrationNotes || "";
  }

  // 13. KHOA HỌC (KH)
  else if (clean === "KH" || clean.startsWith("KH(") || clean.toLowerCase().includes("khoa học") || clean.toLowerCase().includes("khoa hoc")) {
    subject = `KHOA HỌC ${gradeNum}`;
    if (!note && clean.includes("(H)")) note = "GV Bộ môn: Cô Huế";
    if (!note && clean.includes("(TB)")) note = "GV Bộ môn: Phân hiệu Tân Bình";
    const pInW = subjectPeriodInWeek || ((day === "Thứ Hai" || day === "Thứ Ba") ? 1 : 2);
    const info = getGradeCurriculumLesson(gradeNum, "khoa học", week, pInW);
    lessonTitle = info.lessonTitle;
    curriculumPeriod = info.curriculumPeriod;
    integrationNotes = info.integrationNotes || "";
  }

  // 14. ĐẠO ĐỨC (ĐĐ)
  else if (clean.includes("ĐĐ") || clean.toLowerCase().includes("đạo đức") || clean.toLowerCase().includes("dao duc")) {
    subject = `ĐẠO ĐỨC ${gradeNum}`;
    if (!note && clean.includes("(P)")) note = "GV Bộ môn: Cô Phượng";
    if (!note && clean.includes("(H)")) note = "GV Bộ môn: Cô Huế";
    if (!note && clean.includes("(TB)")) note = "GV Bộ môn: Phân hiệu Tân Bình";
    const pInW = subjectPeriodInWeek || 1;
    const info = getGradeCurriculumLesson(gradeNum, "đạo đức", week, pInW);
    lessonTitle = info.lessonTitle;
    curriculumPeriod = info.curriculumPeriod;
    integrationNotes = info.integrationNotes || "";
  }

  // 15. TĂNG CƯỜNG TIẾNG VIỆT (TCTV, Luyện TV)
  else if (
    clean === "TCTV" ||
    clean.includes("TCTV") ||
    clean.includes("T. cường TV") ||
    clean.includes("T.cường TV") ||
    clean.toLowerCase().includes("luyện tiếng việt") ||
    clean.toLowerCase().includes("luyện tv") ||
    clean.toLowerCase().includes("tăng cường tiếng việt")
  ) {
    subject = `TIẾNG VIỆT ${gradeNum}`;
    subSubject = "Tăng cường Tiếng Việt";
    if (!note && clean.includes("(P)")) note = "GV Bộ môn: Cô Phượng";
    const pInW = subjectPeriodInWeek || 1;
    lessonTitle = `Luyện tập Tiếng Việt: Củng cố rèn chữ, từ và câu tuần ${week}`;
    curriculumPeriod = `TCTV${pInW}`;
    integrationNotes = "Rèn luyện kĩ năng đọc, viết và diễn đạt lưu loát";
  }

  // 16. TĂNG CƯỜNG TOÁN (TCT, Luyện Toán)
  else if (
    clean === "TCT" ||
    clean.includes("TCT") ||
    clean.includes("T. cường T") ||
    clean.includes("T.cường T") ||
    clean.toLowerCase().includes("luyện toán") ||
    clean.toLowerCase().includes("luyện t") ||
    clean.toLowerCase().includes("tăng cường toán")
  ) {
    subject = `TOÁN ${gradeNum}`;
    subSubject = "Tăng cường Toán";
    if (!note && (clean.includes("(P)") || clean.includes("(p)"))) note = "GV Bộ môn: Cô Phượng";
    const pInW = subjectPeriodInWeek || 1;
    lessonTitle = `Luyện tập thực hành Toán tuần ${week}`;
    curriculumPeriod = `TCT${pInW}`;
    integrationNotes = "Củng cố kĩ năng tính toán và giải toán có lời văn";
  }

  // 17. TIẾNG VIỆT CHÍNH KHÓA (TV)
  else if (
    clean === "TV" ||
    clean.startsWith("TV ") ||
    clean === "Tiếng Việt" ||
    clean.toLowerCase().includes("tiếng việt") ||
    clean.toLowerCase().includes("tieng viet")
  ) {
    subject = `TIẾNG VIỆT ${gradeNum}`;
    const pInW = subjectPeriodInWeek || 1;
    const info = getGradeCurriculumLesson(gradeNum, "tiếng việt", week, Math.min(pInW, 12));
    lessonTitle = info.lessonTitle;
    subSubject = info.subSubject || "";
    curriculumPeriod = info.curriculumPeriod;
    integrationNotes = info.integrationNotes || "";
  }

  // 18. TOÁN CHÍNH KHÓA (T)
  else if (
    clean === "T" ||
    clean.startsWith("T ") ||
    clean === "Toán" ||
    clean.toLowerCase().includes("toán") ||
    clean.toLowerCase().includes("toan")
  ) {
    subject = `TOÁN ${gradeNum}`;
    const pInW = subjectPeriodInWeek || 1;
    const info = getGradeCurriculumLesson(gradeNum, "toán", week, Math.min(pInW, 5));
    lessonTitle = info.lessonTitle;
    curriculumPeriod = info.curriculumPeriod;
    integrationNotes = info.integrationNotes || "";
  }

  // 19. HỌP TOÀN TRƯỜNG / SINH HOẠT CHUYÊN MÔN (SHCM / HỌP)
  else if (clean.toUpperCase() === "SHCM" || clean.toUpperCase() === "HỌP" || clean.toUpperCase().includes("SHCM") || clean.toUpperCase().includes("HỌP")) {
    subject = "SHCM";
    subSubject = "Sinh hoạt chuyên môn";
    lessonTitle = "Sinh hoạt chuyên môn / Họp hội đồng sư phạm";
    curriculumPeriod = "-";
    if (!note) note = "Toàn trường";
    integrationNotes = "";
  }

  // 20. TỰ CHỌN HOẶC MÔN HỌC KHÁC
  else {
    subject = clean.toUpperCase();
    subSubject = "";
    lessonTitle = clean;
    curriculumPeriod = period;
    integrationNotes = "Thực hiện theo kế hoạch nhà trường";
  }

  const specName = getSpecialistTeacherShortName({ subject, subSubject, note, lessonTitle, raw: clean });
  const isSpecialistPeriod = Boolean(specName) && subject !== "SHCM" && subject !== "HỌP";

  return {
    id: `item-${day}-${session}-${period}-${className}-${Math.random().toString(36).substring(2, 7)}`,
    day,
    dateStr,
    session,
    period,
    subject,
    subSubject,
    curriculumPeriod,
    lessonTitle: cleanLessonTitle(lessonTitle),
    integrationNotes,
    note,
    teacherName,
    className,
    isSpecialistPeriod,
    specialistTeacherName: specName || undefined,
  };
}
