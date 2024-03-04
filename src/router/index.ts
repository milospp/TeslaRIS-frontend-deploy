import { createRouter, createWebHistory } from "vue-router";
import { defaultLocale } from '@/i18n'
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import UserListView from "@/views/UserListView.vue";
import EventListView from "@/views/EventListView.vue";
import PersonListView from "@/views/PersonListView.vue";
import AccountActivationView from "@/views/AccountActivationView.vue";
import OrganisationUnitListView from "@/views/OrganisationUnitListView.vue";
import ScientificResultsView from "@/views/ScientificResultsView.vue";
import JournalListView from "@/views/JournalListView.vue";
import BookSeriesListView from "@/views/BookSeriesListView.vue";
import PublisherListView from "@/views/PublisherListView.vue";
import AdvancedSearchView from "@/views/AdvancedSearchView.vue";
import UserProfileView from "@/views/UserProfileView.vue";
import SubmitConferenceView from "@/views/SubmitConferenceView.vue";
import SubmitPublisherView from "@/views/SubmitPublisherView.vue";
import SubmitPersonView from "@/views/SubmitPersonView.vue";
import SubmitOrganisationUnitView from "@/views/SubmitOrganisationUnitView.vue";
import SubmitJournalView from "@/views/SubmitJournalView.vue";
import SubmitBookSeriesView from "@/views/SubmitBookSeriesView.vue";
import SubmitJournalPublicationView from "@/views/SubmitJournalPublicationView.vue";
import SubmitProceedingsView from "@/views/SubmitProceedingsView.vue";
import SubmitProceedingsPublicationView from "@/views/SubmitProceedingsPublicationView.vue";
import ResetPasswordView from "@/views/ResetPasswordView.vue";
import SubmitPatentView from "@/views/SubmitPatentView.vue";
import SubmitSoftwareView from "@/views/SubmitSoftwareView.vue";
import SubmitDatasetView from "@/views/SubmitDatasetView.vue";

import ResearcherLandingView from "@/views/landingPages/ResearcherLandingView.vue";
import OrgUnitLandingView from "@/views/landingPages/OrgUnitLandingView.vue";



const roles = { researcher: "RESEARCHER", admin: "ADMIN", institutionalEditor: "INSTITUTIONAL_EDITOR" };


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "base",
            redirect: { name: 'home', params: { locale: defaultLocale } },
        },
        {
            path: "/:locale",
            name: "baseLocale",
            children: [
                {
                    path: "",
                    name: "home",
                    component: HomeView,
                    meta: {
                        authenticated: false,
                        authorities: [],
                    },
                },
                {
                    path: "login",
                    name: "login",
                    component: LoginView,
                    meta: {
                        authenticated: false,
                        authorities: [],
                    },
                    props: true,
                },
                {
                    path: "register",
                    name: "register",
                    component: RegisterView,
                    meta: {
                        authenticated: false,
                        authorities: [],
                    },
                },
                {
                    path: "user-profile",
                    name: "userProfile",
                    component: UserProfileView,
                    meta: {
                        authenticated: true,
                        authorities: [roles.admin, roles.institutionalEditor, roles.researcher],
                    },
                },
                {
                    path: "users",
                    name: "users",
                    component: UserListView,
                    meta: {
                        authenticated: true,
                        authorities: [roles.admin],
                    },
                },
                {
                    path: "events",
                    name: "events",
                    component: EventListView,
                    meta: {
                        authenticated: true,
                        authorities: [roles.admin],
                    },
                },
                {
                    path: "submit-conference",
                    name: "submitConference",
                    component: SubmitConferenceView,
                    meta: {
                        authenticated: true,
                        authorities: [roles.admin, roles.institutionalEditor, roles.researcher],
                    },
                },
                {
                    path: "submit-publisher",
                    name: "submitPublisher",
                    component: SubmitPublisherView,
                    meta: {
                        authenticated: true,
                        authorities: [roles.admin, roles.institutionalEditor, roles.researcher],
                    },
                },
                {
                    path: "submit-person",
                    name: "submitPerson",
                    component: SubmitPersonView,
                    meta: {
                        authenticated: true,
                        authorities: [roles.admin, roles.institutionalEditor],
                    },
                },
                {
                    path: "submit-organisation-unit",
                    name: "submitOrganisationUnit",
                    component: SubmitOrganisationUnitView,
                    meta: {
                        authenticated: true,
                        authorities: [roles.admin],
                    },
                },
                {
                    path: "book-series",
                    name: "bookSeries",
                    component: BookSeriesListView,
                    meta: {
                        authenticated: true,
                        authorities: [roles.admin],
                    },
                },
                {
                    path: "submit-book-series",
                    name: "submitBookSeries",
                    component: SubmitBookSeriesView,
                    meta: {
                        authenticated: true,
                        authorities: [roles.admin],
                    },
                },
                {
                    path: "journals",
                    name: "journals",
                    component: JournalListView,
                    meta: {
                        authenticated: true,
                        authorities: [roles.admin],
                    },
                },
                {
                    path: "submit-journal",
                    name: "submitJournal",
                    component: SubmitJournalView,
                    meta: {
                        authenticated: true,
                        authorities: [roles.admin, roles.institutionalEditor, roles.researcher],
                    },
                },
                {
                    path: "submit-journal-publication",
                    name: "submitJournalPublication",
                    component: SubmitJournalPublicationView,
                    meta: {
                        authenticated: true,
                        authorities: [roles.admin, roles.institutionalEditor, roles.researcher],
                    },
                },
                {
                    path: "submit-patent",
                    name: "submitPatent",
                    component: SubmitPatentView,
                    meta: {
                        authenticated: true,
                        authorities: [roles.admin, roles.institutionalEditor, roles.researcher],
                    },
                },
                {
                    path: "submit-software",
                    name: "submitSoftware",
                    component: SubmitSoftwareView,
                    meta: {
                        authenticated: true,
                        authorities: [roles.admin, roles.institutionalEditor, roles.researcher],
                    },
                },
                {
                    path: "submit-dataset",
                    name: "submitDataset",
                    component: SubmitDatasetView,
                    meta: {
                        authenticated: true,
                        authorities: [roles.admin, roles.institutionalEditor, roles.researcher],
                    },
                },
                {
                    path: "publishers",
                    name: "publishers",
                    component: PublisherListView,
                    meta: {
                        authenticated: true,
                        authorities: [roles.admin],
                    },
                },
                {
                    path: "persons",                    
                    children: [
                        {
                            path: "",
                            name: "persons",
                            component: PersonListView,
                            meta: {
                                authenticated: false,
                                authorities: [],
                            },
                        },
                        {
                            path: ":id",
                            name: "researcherLandingPage",
                            component: ResearcherLandingView,
                            meta: {
                                authenticated: false,
                                authorities: [],
                            },
                        }
                    ]
                },
                {
                    path: "organisation-units",                 
                    children: [
                        {
                            path: "",
                            name: "organisationUnits",
                            component: OrganisationUnitListView,
                            meta: {
                                authenticated: false,
                                authorities: [],
                            },
                        },
                        {
                            path: ":id",
                            name: "organisationUnitLandingPage",
                            component: OrgUnitLandingView,
                            meta: {
                                authenticated: false,
                                authorities: [],
                            },
                        }
                    ]
                    
                },
                {
                    path: "scientific-results",
                    name: "scientificResults",
                    component: ScientificResultsView,
                    meta: {
                        authenticated: false,
                        authorities: [],
                    },
                },
                {
                    path: "submit-proceedings",
                    name: "submitProceedings",
                    component: SubmitProceedingsView,
                    meta: {
                        authenticated: true,
                        authorities: [roles.admin, roles.institutionalEditor, roles.researcher],
                    },
                },
                {
                    path: "submit-proceedings-publication",
                    name: "submitProceedingsPublication",
                    component: SubmitProceedingsPublicationView,
                    meta: {
                        authenticated: true,
                        authorities: [roles.admin, roles.institutionalEditor, roles.researcher],
                    },
                },
                {
                    path: "advanced-search",
                    name: "advancedSearch",
                    component: AdvancedSearchView,
                    meta: {
                        authenticated: false,
                        authorities: [],
                    },
                },
                {
                    path: "activate-account/:activationToken",
                    name: "activateAccount",
                    component: AccountActivationView,
                    meta: {
                        authenticated: false,
                        authorities: [],
                    },
                },
                {
                    path: "reset-password/:resetToken",
                    name: "resetPassword",
                    component: ResetPasswordView,
                    meta: {
                        authenticated: false,
                        authorities: [],
                    },
                },
            ]
        },
    ],
});

export default router;
