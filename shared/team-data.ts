import teamData from './data/team.json';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  image: string;
  summary: string;
  bio?: string;
  keyAchievements?: string[];
  expertise?: string[];
  qualifications?: string[];
  experience: string;
  email?: string;
  linkedin?: string;
}

export const TEAM_MEMBERS: TeamMember[] = teamData;

export const getTeamMemberById = (id: string): TeamMember | undefined => {
  return TEAM_MEMBERS.find(member => member.id === id);
};

export const getTeamMembersByDepartment = (department: string): TeamMember[] => {
  return TEAM_MEMBERS.filter(member => member.department === department);
};

export const getExecutiveTeam = (): TeamMember[] => {
  return TEAM_MEMBERS.filter(member => 
    member.role.includes('Chief') || member.role.includes('Director')
  );
};