// libs
import { Routes, Route } from "react-router-dom";

// PAGES
// auth
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
// profile
import FeedBackPage from './pages/profile/FeedBackPage';
import LogoutPage from './pages/profile/LogoutPage';
import MyCarsPage from './pages/profile/MyCarsPage';
import PaymentsMethodsPage from './pages/profile/PaymentsMethodsPage';
import PersonalDataPage from './pages/profile/PersonalDataPage';
import SettingsPage from './pages/profile/SettingsPage';
// tabs
import AddRidePage from './pages/tabs/AddRidePage';
import MessagesPage from './pages/tabs/MessagesPage';
import NotificationsPage from './pages/tabs/NotificationsPage';
import ProfilePage from './pages/tabs/ProfilePage';
import TrafficsPage from './pages/tabs/TrafficsPage';
// other
import NotFoundPage from './pages/other/NotFoundPage';

// multilanguage
import './utils/i18n';

// utils
import ROUTES from './utils/routes';

// general css styles
import './App.css';

function App() {
	return (
		<div>
			<Routes>
				{/* auth */}
				<Route path={ROUTES.AUTH_LOGIN} element={<LoginPage />}/>
				<Route path={ROUTES.AUTH_REGISTER} element={<RegisterPage />}/>
				
				{/* profile */}
				<Route path={ROUTES.PROFILE_FEEDBACK} element={<FeedBackPage />}/>
				<Route path={ROUTES.PROFILE_LOGOUT} element={<LogoutPage />}/>
				<Route path={ROUTES.PROFILE_CARS} element={<MyCarsPage />}/>
				<Route path={ROUTES.PROFILE_PAYMENTS} element={<PaymentsMethodsPage />}/>
				<Route path={ROUTES.PROFILE_PERSONAL_DATA} element={<PersonalDataPage />}/>
				<Route path={ROUTES.PROFILE_SETTINGS} element={<SettingsPage />}/>

				{/* tabs */}
				<Route path={ROUTES.TAB_ADD_RIDE} element={<AddRidePage />}/>
				<Route path={ROUTES.TAB_MESSAGE} element={<MessagesPage />}/>
				<Route path={ROUTES.TAB_NOTIFICATIONS} element={<NotificationsPage />}/>
				<Route path={ROUTES.TAB_PROFILE} element={<ProfilePage />}/>
				<Route path={ROUTES.TAB_TRAFFICCS} element={<TrafficsPage />}/>

				{/* other */}
				<Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />}/>
			</Routes>

			<p style={{position: "absolute", top: "3px", right: "3px", opacity: ".3"}}>v.0.0.2</p>
		</div>
	);
}

export default App;