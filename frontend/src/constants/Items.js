import LineChart from '../theme/svg/line-chart.svg';
import Clipboard from '../theme/svg/clipboards.svg';
import Course from '../theme/svg/language.svg';

// Menu items
export const menuItems = {
    courses: {
        label: 'Quản Lý Học Phần',
        icon: LineChart,
        url: '/courses'
    },
    students: {
        label: 'Quản Lý Sinh Viên',
        icon: Clipboard,
        url: '/students'
    },
    examinations: {
        label: 'Quản Lý Kì Thi',
        icon: Course,
        url: '/examinations'
    },
    profile: {
        label: 'Thông tin cá nhân',
        icon: Course,
        url: '/profile'
    },
    regExam: {
        label: 'Đăng kí ca thi',
        url: '/register'
    }
}

