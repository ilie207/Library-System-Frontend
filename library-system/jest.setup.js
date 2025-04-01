require("@testing-library/jest-dom");

const mockRouter = {
  push: jest.fn(),
  refresh: jest.fn(),
  back: jest.fn(),
};

const mockSupabase = {
  auth: {
    signInWithPassword: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
    getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
    onAuthStateChange: jest.fn().mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
    }),
  },
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  single: jest.fn().mockResolvedValue({ data: null }),
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

jest.mock(
  "lib/supabase",
  () => ({
    supabase: mockSupabase,
  }),
  { virtual: true }
);

global.__mocks__ = {
  router: mockRouter,
  supabase: mockSupabase,
};

beforeEach(() => {
  jest.clearAllMocks();
});
