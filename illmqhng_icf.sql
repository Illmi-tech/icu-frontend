-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 11, 2026 at 11:09 AM
-- Server version: 11.4.10-MariaDB-cll-lve
-- PHP Version: 8.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `illmqhng_icf`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `first_name` varchar(191) NOT NULL,
  `last_name` varchar(191) NOT NULL,
  `username` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `first_name`, `last_name`, `username`, `password`) VALUES
(1, 'Adriel', 'Amadi', 'admin', '$2b$10$.frPcFzPrIrO04qFw2XnBeumW1.YfFspoXu2aJUCt.VqpdPoXyo3W');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `content` text NOT NULL,
  `image_path` varchar(191) DEFAULT NULL,
  `slug` varchar(191) NOT NULL,
  `date` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `author_id` int(11) NOT NULL,
  `image_id` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `content`, `image_path`, `slug`, `date`, `author_id`, `image_id`) VALUES
(20, 'Bridging Nigeria’s Digital Divide: Empowering Girls for a Thriving Future', 'The future of work, education, and leadership is digital. From e-learning platforms transforming classrooms to careers powered by coding, data, and artificial intelligence, technology is reshaping the global landscape. Yet in Nigeria, millions of girls risk being excluded from this transformation, deepening inequality and threatening the nation’s progress in a tech-driven world.\r\nAs of early 2025, internet penetration stands at just 45.4% of the population, or about 107 million users. Within that number lies a sharp gender divide. Adolescent boys are far more likely than girls to own devices, access the internet, and develop digital skills, perpetuating a cycle of exclusion that demands urgent attention.\r\n\r\nThe Barriers Holding Girls Back\r\n\r\nThis gendered digital divide is driven by multiple obstacles. Poverty restricts access to smartphones, laptops, and reliable internet. Cultural norms reinforce the myth that technology is “for boys.” Safety concerns, from cyberbullying to online exploitation, deter families from encouraging girls’ digital engagement. Underfunded schools make matters worse, with many lacking functional ICT infrastructure, leaving classrooms outdated or nonexistent.\r\n\r\nThe GSMA’s Mobile Gender Gap Report 2025 highlights the gap clearly. While Nigerian women are nearly as likely as men to own a basic mobile phone, only 39% own a smartphone compared to a higher share among men. In rural areas, girls are 30% less likely to own a smartphone or access the internet than boys. An estimated 45 million Nigerian women remain offline altogether. These figures reveal a system that denies girls opportunities not because of lack of talent, but because of persistent, structural barriers.\r\n\r\nWhy Bridging the Gap Matters\r\n\r\nClosing the gender digital divide is not just about fairness, it is an economic, educational, and social necessity. Digitally skilled girls can access high-demand jobs, launch businesses, and boost Nigeria’s GDP. Today, however, women make up only 17% of the tech workforce. Online tools also reduce barriers of cost, distance, and insecurity, helping girls in rural or conflict-affected areas continue learning.\r\n\r\nTechnology gives girls platforms to challenge stereotypes, raise their voices, and inspire others. Empowered girls grow into women who mentor peers, strengthen families, and drive grassroots innovation. Yet across sub-Saharan Africa, including Nigeria, 205 million women, equivalent to 61% of the adult female population, still lack mobile internet access. This is not just a gap. It is an untapped pool of talent, creativity, and leadership that Nigeria urgently needs to remain competitive.\r\n\r\nFailure to act risks entrenching a permanent underclass of digitally excluded women and girls. With over 90% of jobs worldwide now requiring digital skills, Nigeria cannot afford this widening inequality. The existing 13% gender gap in mobile ownership across the region shows how deep and stubborn these disparities can become if left unaddressed.\r\n\r\nA Path Forward\r\n\r\nBridging this divide requires bold and collective action. Government must invest in ICT infrastructure for schools and integrate digital literacy into national curricula, with special focus on underserved regions. The private sector should expand access to affordable devices, reliable connectivity, and mentorship programs tailored for girls. Civil society can challenge harmful norms and build parental trust in girls’ safe and productive use of technology. At the family and community level, supportive environments must be created that encourage girls to explore and excel in digital spaces.\r\nPrograms like DIGITGALS, which equips adolescent girls in public schools with digital literacy, numeracy, and technology skills, demonstrate the impact of targeted interventions. By building confidence and preparing girls for higher education and future careers, such programs show how coordinated efforts can help bridge the gender digital divide and unlock Nigeria’s untapped potential.\r\n\r\nThe digital revolution waits for no one. Nigeria cannot afford to let its girls be left behind. Equal digital access is not a luxury, it is a cornerstone of peace, prosperity, and progress. Investing in girls’ digital empowerment is among the smartest choices Nigeria can make. It is not only about preparing girls for the future. It is about shaping a future where Nigeria itself can thrive.\r\n', NULL, 'bridging-nigerias-digital-divide-empowering-girls-for-a-thriving-future-543', '2025-09-22 08:14:19.593', 1, NULL),
(21, 'Safe Spaces for Children: Building the Foundations for Protection, Equity, and Empowerment', '<p>Nigeria is facing an education emergency that threatens its future. More than 18 million children are out of school, giving the country one of the highest rates of excluded learners anywhere in the world. These are not just statistics on a page. Each number represents a child whose potential is cut short, a family struggling to break free from poverty, and a nation losing ground in its pursuit of progress. The causes are complex and interconnected. Poverty forces parents to choose between survival and schooling. Insecurity and conflict destroy classrooms and displace entire communities. Harmful practices like child labour and early marriage take children, especially girls, out of school. Even in cities, the rising costs of fees, uniforms, and transportation make education a privilege rather than a right. The result is a generation at risk of being left behind, and a country bearing the hidden costs of lost opportunity. But what does this truly cost us? Economically, the loss is staggering. Each year of schooling increases an individual’s income by about 10 percent, according to the World Bank. Now imagine millions of children missing out on six, nine, or twelve years of education. That is billions of naira in lost productivity and innovation every year, income that could have fueled businesses, created jobs, and strengthened Nigeria’s global competitiveness. Socially, the costs are heartbreaking. When a 13-year-old girl is pulled from school for early marriage, her childhood ends abruptly. She loses the chance to dream, to grow, and to break the cycle of poverty. The community loses too, because educated women are more likely to raise healthier families, start businesses, and invest back into society. Without education, inequality widens and whole communities remain trapped in disadvantage. For national security, the risks are grave. In places where opportunities are scarce, out-of-school children are easy targets for extremist groups or criminal networks. When boys grow up without skills, work, or hope, they become vulnerable to recruitment by those who exploit their frustrations. Each child denied education is not just a personal tragedy, it is a potential spark for instability. These are the hidden costs of Nigeria’s education crisis: lost wealth, lost equity, lost peace. Yet this is not a crisis without solutions. Across Nigeria, communities and organizations are proving that change is possible when education is prioritized. At Illmi Children’s Fund (ICF), we have seen how targeted interventions can turn despair into opportunity: Training, Advocacy, Research, and Mentorship (TARM): empowering teachers, protecting girls, and building safer schools. TARM equips female teachers to serve as mentors and advocates for adolescent girls, helping them navigate challenges like early marriage and gender-based violence while encouraging them to complete their secondary education. To date, over 1,000 teachers have been trained and more than 3,500 adolescent girls supported to pursue higher aspirations. Walk In Their Shoes (WITS): a nationwide crowdfunding campaign that turns compassion into opportunity for out-of-school children. Through WITS, more than 800 scholarships have been awarded, enabling underserved children to return to school and pursue brighter futures. Each contribution helps break the cycle of poverty and ensures no child has to walk alone on the path to learning. DIGITSGALS: closing the digital divide for girls in public schools. In partnership with the National Information Technology Development Agency (NITDA), DIGITSGALS equips adolescent girls with digital literacy skills, from online safety to content creation and digital presentations. Over 150 girls have already benefited, building the confidence and skills to thrive in a digital economy that too often excludes them. But no single organization can solve this alone. Governments must increase education budgets and enforce compulsory schooling. Communities must rally around their children, dismantling barriers like early marriage and child labour. The private sector, philanthropists, and global partners must see education as the most transformative investment in Nigeria’s future. Every child in school is a step toward a stronger, safer, and more inclusive nation. At Illmi Children’s Fund, our mission is simple yet urgent: Empowering a child. Transforming generations. We invite partners, donors, and advocates to join us in this mission. Together, we can ensure that no child is left behind and that Nigeria’s future is not defined by lost potential but by fulfilled promise. The cost of inaction is too high. The time to act is now. </p>', 'https://res.cloudinary.com/dzlolggu9/image/upload/v1762081639/blogs/kwaakb8ylfyuwubbd5wh.webp', 'the-hidden-costs-of-out-of-school-children-in-nigeria-150', '2025-09-22 08:23:18.706', 1, 'blogs/kwaakb8ylfyuwubbd5wh'),
(26, 'Safe Spaces for Children: Building the Foundations for Protection, Equity, and Empowerment', '<p>Every child has the right to a safe environment where they can learn, grow, and thrive. Yet, across Nigeria, countless children face threats of violence, harassment, and exploitation both in schools and within their communities. Gender-based violence (GBV) remains a silent epidemic, often hidden behind closed doors, normalized by social stigma, and underreported due to fear of retaliation or mistrust in authorities.</p><p><br></p><p>Globally, an estimated 1 in 3 girls and 1 in 6 boys experience some form of sexual or physical violence before the age of 18. In Nigeria, school-based assessments reveal that verbal, physical, and sexual abuse persist in educational settings, often underreported due to fear, stigma, or lack of trust in authorities. Such environments limit learning, reduce self-confidence, and threaten future prospects for children.</p><p><br></p><p>High-profile cases, such as the tragic story of Ochanya Ogbanje, highlight the devastating consequences of systemic failures and the urgent need for proactive interventions. These incidents are not isolated—they reflect broader gaps in child protection systems, insufficient safeguarding measures in educational institutions, and societal misconceptions about who can be a perpetrator.</p><p>Beyond the individual trauma, the impact of violence on children has far-reaching implications for education, mental health, and social development. </p><p><br></p><p>Children exposed to GBV are more likely to experience anxiety, depression, and academic disruption, which undermines their ability to reach their full potential.</p><p><br></p><p>Protecting children is not only a moral and legal imperative, but also essential for sustainable development and social stability. Safe, nurturing environments allow children to learn without fear, participate actively in their communities, and grow into empowered adults who can contribute to the nation’s future. Ensuring safety for children must therefore be a shared responsibility across schools, families, communities, and institutions, with data-driven interventions and strong accountability frameworks at the core.</p><p><br></p><p><strong>Creating Safe Spaces: Evidence-Based Approaches</strong></p><p>Safe spaces are defined not only by their physical security but by their ability to foster trust, empowerment, and opportunity. Evidence from child protection programs across the world, including initiatives supported by the United Nations, shows that effective strategies include:</p><p><br></p><ol><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Youth Participation:</strong> Engaging children as active participants in shaping rules, reporting mechanisms, and advocacy initiatives.</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>School-Based Programs:</strong> Establishing peer-led clubs, mentorship networks, and confidential reporting channels that allow students to voice concerns safely.</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Capacity Building for Adults:</strong> Training teachers, administrators, and community leaders to identify early signs of abuse, respond appropriately, and prevent further harm.</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Policy Integration:</strong> Translating research and field data into actionable national and local policies that strengthen child protection systems.</li></ol><p><br></p><p>In Nigeria, the Adolescent Safeguarding in Schools (ASIS) Project, supported by UNFPA, has engaged students across 22 schools in the Federal Capital Territory, establishing youth-led clubs, training educators, and promoting active participation in creating safe learning environments.</p><p><br></p><p><strong>Why Safe Spaces Matter</strong></p><p> Research consistently shows that children who grow up in safe and supportive environments are more likely to succeed academically, develop leadership skills, and become engaged citizens. Conversely, unsafe environments contribute to trauma, reduced educational outcomes, and perpetuate cycles of poverty and social inequality.</p><p><br></p><p><strong>Conclusion</strong></p><p>The responsibility to protect children extends beyond schools. Families, civil society, government agencies, and the private sector must collaborate to ensure children can grow free from fear. Globally, organizations like the United Nations advocate for integrated approaches that combine education, legal protection, and psychosocial support, reinforcing the principle that child protection is a societal duty, not an optional initiative.</p><p><br></p><p><br></p>', 'https://res.cloudinary.com/dzlolggu9/image/upload/v1762081544/blogs/hrxoxigpaas8tals8yjy.webp', 'safe-spaces-for-children-building-the-foundations-for-protection-equity-and-empowerment-496', '2025-11-02 11:05:45.481', 1, 'blogs/hrxoxigpaas8tals8yjy'),
(27, 'Foundational Learning is Where Equity Begins: What Must Be Done in Nigeria’s Education Sector', '<p>Foundational learning, the ability to read, write, and do basic numeracy, shapes everything that comes next in a child’s life. It determines how children reason, communicate, solve problems, and believe in themselves. Yet far too many children in Nigeria are forced to run a race they never got a fair start in. Poverty, displacement, and unequal access to quality education leave children struggling to catch up, and opportunities are lost before they even begin.</p><p><br></p><p>According to <strong>UNICEF</strong>, nearly <strong>10 million children aged 5–14 are out of school</strong>, and over <strong>60% of children in primary 4 cannot read at their expected level</strong>. This alarming statistic highlights a significant educational crisis, with many children facing barriers such as poverty, inadequate infrastructure, insecurity, and cultural norms that discourage attendance. Gender disparities exacerbate the problem, particularly affecting girls.</p><p><br></p><p>The recently proposed <strong>2026 Federal Government budget</strong> allocates <strong>N113.764 billion</strong> to interventions including school feeding, scholarships, support for out-of-school children, and security infrastructure in unity colleges. While this allocation is a positive step, experience shows that funding alone cannot guarantee equitable learning outcomes. Implementation, monitoring, and strategic alignment with community needs are critical to ensure resources reach the children who need them most.</p><p><br></p><p>At <strong>Illmi Children’s Fund</strong>, we witness every day how barriers like poverty, displacement, and limited access to quality education rob children of a fair start. Yet we also see the transformative power of well-designed interventions. Drawing on years of programmatic experience, evidence-based strategies, and global best practices, we know what truly works. To ensure every child has the opportunity to thrive, the following actions are essential:</p><p><br></p><h3><strong>1. Invest in Early and Foundational Learning</strong></h3><p>Children must acquire literacy and numeracy skills at the earliest stages. Governments and institutions should prioritize programs that meet learners where they are, reflect their languages and realities, and provide the guidance and tools teachers need to succeed. Early intervention prevents gaps that are far more costly to fix later.</p><h3><br></h3><h3><strong>2. Ensure Inclusive and Equitable Access</strong></h3><p>No child’s future should depend on postcode, income, or circumstance. Policies must focus on reaching girls, children in displacement-affected areas, and those excluded from formal schooling. Partnerships with organizations like ICF can extend reach efficiently and sustainably.</p><h3><br></h3><h3><strong>3. Integrate Digital Skills and Literacy</strong></h3><p>Digital literacy is no longer optional. Strategic investments in infrastructure, teacher training, and access to devices can empower children to thrive academically and socially. Initiatives such as <strong>DIGITGALS</strong> show that even small, targeted interventions in digital learning can have long-term, transformative impact.</p><h3><br></h3><h3><strong>4. Strengthen Teachers and Learning Environments</strong></h3><p>Teachers are the frontline of education. Supporting them with continuous training, mentorship, and resources ensures teaching is effective, inclusive, and contextually relevant. Safe and inclusive learning spaces, as demonstrated in our <strong>TARM</strong> and <strong>CCLM</strong> programs, improve attendance, retention, and learning outcomes.</p><h3><br></h3><h3><strong>5. Monitor, Evaluate, and Adapt</strong></h3><p>Robust data collection and evidence-based monitoring are essential. Success must be measured not just by budget expenditure, but by actual learning gains. Programs should be iterative, adapting to lessons learned and scaling what works.</p><h3><br></h3><h3><strong>Conclusion</strong></h3><p>Nigeria’s 2026 budget signals commitment to education, but translating allocations into meaningful outcomes requires <strong>evidence-based policy, strategic implementation, and multi-stakeholder collaboration</strong>. At Illmi Children’s Fund, we are ready to work with government, institutions, and donors to ensure every child has a fair start. Foundational learning is not only a right, it is the foundation for equity, resilience, and a stronger future for Nigeria.</p>', 'https://res.cloudinary.com/dzlolggu9/image/upload/v1771233764/blogs/nibctdzj7nnnagh25jwl.webp', 'foundational-learning-is-where-equity-begins-what-must-be-done-in-nigerias-education-sector-383', '2026-02-16 09:22:45.750', 1, 'blogs/nibctdzj7nnnagh25jwl');

-- --------------------------------------------------------

--
-- Table structure for table `careers`
--

CREATE TABLE `careers` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `content` text NOT NULL,
  `image_path` varchar(191) DEFAULT NULL,
  `slug` varchar(191) NOT NULL,
  `date` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `admin_id` int(11) NOT NULL,
  `image_id` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `careers`
--

INSERT INTO `careers` (`id`, `title`, `content`, `image_path`, `slug`, `date`, `admin_id`, `image_id`) VALUES
(6, 'WE ARE HIRING: FINANCE OFFICER', '<p><strong style=\"color: rgb(28, 23, 23); background-color: transparent;\">Job Summary: </strong></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">The Finance Officer at Illmi Children Fund is responsible for managing financial operations, overseeing budgeting, reporting, and ensuring compliance with financial policies and donor requirements. Additionally, this role involves monitoring and evaluating program effectiveness, collecting and analyzing data, and supporting strategic decision-making. The Finance Officer plays a pivotal role in maintaining financial health, conducting accurate reporting, and providing valuable insights to support the organization\'s mission and goals.</span></p><p><br></p><p><strong style=\"color: rgb(0, 0, 0); background-color: transparent;\">Main Duties and Responsibilities: </strong></p><p><strong style=\"color: rgb(0, 0, 0); background-color: transparent;\"><em>The duties and responsibilities of the Finance Officer at Illmi Children Fund include:</em></strong></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Develop and implement financial policies, procedures, and systems to ensure effective management of funds.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Oversee budget development and monitoring, ensuring alignment with organizational goals and donor requirements.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Monitor cash flow and financial health, providing regular reports to management and stakeholders.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Ensure compliance with regulatory requirements and donor guidelines.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Prepare accurate and timely financial reports for donors, management, and board members.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Coordinate audits and ensure all financial records are maintained in accordance with auditing standards.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Manage financial aspects of grants, including budgeting, reporting, and compliance.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Work closely with program managers to track expenses and ensure proper utilization of grant funds.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Provide financial analysis and recommendations for grant proposals and project budgets.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Conduct financial analysis, forecasting, and modeling to support strategic decision-making.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Develop financial projections and scenarios for long-term planning and fundraising purposes.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Train and mentor staff on financial management best practices, policies, and tools.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Build the capacity of the finance team to effectively manage budgets, grants, and reporting requirements.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Serve as a primary point of contact for financial inquiries from donors, partners, and regulatory agencies.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Facilitate communication and collaboration between finance and programs teams.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Present financial information and insights to internal and external stakeholders clearly and engagingly.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Identify financial risks and develop strategies to mitigate them.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Establish internal controls and procedures to safeguard assets and prevent fraud or misuse of funds.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Stay informed about industry trends, regulations, and best practices related to nonprofit finance.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Undertake special projects or initiatives as assigned by senior management.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Respond to ad hoc requests from various stakeholders.</span></p><p><br></p><p><strong style=\"color: rgb(0, 0, 0); background-color: transparent;\">Qualifications and Skills: </strong></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">A Bachelor\'s degree in finance, accounting, or a related field is essential. Advanced degrees such as a Master\'s in Accounting/ Finance, are advantageous.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Membership in professional bodies such as ICAN, ACCA, or ANAN is preferred.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">At least 3 years of experience managing finances, budgets, and reporting within the nonprofit sector.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Familiarity with donor financial compliance, tax compliance, and reporting requirements, including experience with international donors. Previous experience in designing and managing social impact programs is highly desirable.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Proficiency in using accounting software such as Zoho or QuickBooks for financial record-keeping and reporting.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Advanced Excel skills for financial analysis, modeling, and reporting.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Familiarity with project management software for efficient task management and collaboration.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Ability to lead and manage a small finance team, providing guidance, support, and mentorship.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Strong organizational and time management skills to prioritize tasks and meet deadlines effectively.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Strong analytical skills to interpret financial data, identify trends, and make informed decisions.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Ability to troubleshoot financial issues, propose solutions, and implement corrective actions when necessary.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Excellent verbal and written communication skills to effectively convey financial information to diverse stakeholders.</span></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Presentation skills to facilitate stakeholder engagements, meetings, and training sessions.</span></p><p><br></p><p><strong>Application closes:</strong> 2 weeks from 22nd April 2026</p><p><br></p><p><strong>Location:</strong> Abuja (Hybrid)</p><p><br></p><p> <strong>To apply:</strong> Send your CV to hr.illmichildrensfund@gmail.com</p>', 'https://res.cloudinary.com/dzlolggu9/image/upload/v1776773381/careers/fclyrz80sjxk65behwyh.webp', 'we-are-hiring-finance-officer-170', '2026-04-21 12:04:37.754', 1, 'careers/fclyrz80sjxk65behwyh');

-- --------------------------------------------------------

--
-- Table structure for table `newsletter_issues`
--

CREATE TABLE `newsletter_issues` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `image_path` varchar(191) DEFAULT NULL,
  `image_id` varchar(191) DEFAULT NULL,
  `pdf_path` varchar(191) NOT NULL,
  `pdf_id` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `date` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `press_releases`
--

CREATE TABLE `press_releases` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `content` text NOT NULL,
  `image_path` varchar(191) DEFAULT NULL,
  `slug` varchar(191) NOT NULL,
  `date` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `admin_id` int(11) NOT NULL,
  `image_id` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `press_releases`
--

INSERT INTO `press_releases` (`id`, `title`, `content`, `image_path`, `slug`, `date`, `admin_id`, `image_id`) VALUES
(7, 'Illmi Children’s Fund Calls for Renewed Investment in Education as Nigeria Marks 65 Years of Independence', 'As Nigeria celebrates 65 years of independence, Illmi Children’s Fund (ICF) is calling for bold, sustained\r\ninvestment in education to secure the nation’s future. \r\n\r\nWhile the country has made progress in expanding access to schooling, millions of children, particularly girls and those in marginalised communities, remain excluded from\r\nquality learning opportunities.\r\n\r\n“Education is the bedrock of our nation’s progress. If Nigeria is to truly fulfil the promise of independence, we must ensure every child, regardless of gender or background, has access to safe, inclusive and quality education,” said Mrs. Maryam Augie-Abdulmumin, Founder of Illmi Children’s Fund.\r\n\r\nAdding to this, Tovia Muo, Programmes and Gender Lead at Illmi Children’s Fund, noted:\r\n“Every day, we witness how education transforms lives. In communities where we work, especially with girls,\r\neducation opens doors to dignity, safety and opportunity. \r\nAs we mark 65 years of independence, Nigeria must\r\nprioritise education as a legacy for future generations.”\r\n\r\nAccording to UNICEF, Nigeria is home to one of the world’s largest populations of out-of-school children. This\r\nchallenge threatens not only the future of millions of young Nigerians but also the country’s broader aspirations for\r\npeace, stability and economic growth.\r\n\r\nIllmi Children’s Fund works across Nigeria to break these barriers through programmes that promote literacy,\r\ndigital skills, gender equality and community-driven advocacy. The organisation emphasises that education is not merely a social investment, but also a national security and economic imperative.\r\n\r\nIllmi Children’s Fund calls on government, the private sector and civil society partners to join in transforming\r\nNigeria’s education landscape, ensuring that independence is not only celebrated but truly lived in the lives of every child.', 'https://res.cloudinary.com/dzlolggu9/image/upload/v1759315099/press-releases/awymk5kvy8hrjyekuet4.webp', 'illmi-childrens-fund-calls-for-renewed-investment-in-education-as-nigeria-marks-65-years-of-independence-621', '2025-10-01 10:38:20.173', 1, 'press-releases/awymk5kvy8hrjyekuet4'),
(8, 'International Day of the Girl Child: Illmi Children’s Fund Calls for Urgent Action to Protect the Future of Nigeria’s Girls', '<p>On the International Day of the Girl Child 2025, Illmi Children’s Fund (ICF) is calling on Nigeria to step up efforts to break down the barriers that continue to hold girls back. From child marriage and gender-based violence to lack of access to education and digital opportunities, millions of Nigerian girls remain denied their rights and their futures.</p><p><br></p><p>“Investing in girls is the most transformative investment any nation can make. When girls are educated and safe, they lift families, strengthen communities and power economies. </p><p><br></p><p>Yet, too many Nigerian girls are still being robbed</p><p>of their childhoods and silenced by inequality. This must change, and it must change now,” said Mrs Maryam Augie-Abdulmumin, Founder of Illmi Children’s Fund.</p><p><br></p><p>To mark this year’s Day of the Girl, ICF has planned a series of activities designed to celebrate, inspire and</p><p>empower girls across Nigeria. These include:</p><p><br></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>A virtual webinar themed “The Girl I Am, The Change I Lead”, bringing together leaders, activists and young voices to spotlight the role of girls in shaping a better future.</li></ol><p><br></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>A story writing competition with five participating schools, aimed at amplifying girls’ creativity, voices and aspirations, as part of the International Day of the Girl Child activities.</li></ol><p><br></p><p>The urgency is clear. Nearly one in three girls in Nigeria is married before the age of 18, while insecurity, poverty and gender-based violence continue to push millions out of school. Without decisive action, the country risks entrenching cycles of poverty and instability that will hold generations back.</p><p><br></p><p>Illmi Children’s Fund works across Nigeria to reverse these trends by promoting literacy, digital inclusion, gender equality and community-led advocacy. By creating safe spaces and opportunities, ICF helps girls reclaim their voices, their dignity and their futures.</p><p><br></p><p>On this International Day of the Girl Child, Illmi Children’s Fund is urging the government, civil society and the private sector to move beyond promises and take bold, sustained action. Ensuring that every Nigerian girl grows up safe, educated and empowered is not just a moral duty, it is a national priority.</p>', 'https://res.cloudinary.com/dzlolggu9/image/upload/v1760184216/press-releases/sgx8jwpb0igqjr0eaiyc.webp', 'international-day-of-the-girl-child-illmi-childrens-fund-calls-for-urgent-action-to-protect-the-future-of-nigerias-girls-692', '2025-10-11 12:03:38.068', 1, 'press-releases/sgx8jwpb0igqjr0eaiyc'),
(9, 'Illmi Children’s Fund Condemns Abduction of 25 Schoolgirls in Kebbi State and Calls for Immediate Action to Ensure Their Safe Release and Protect Schools', '<p>Illmi Children’s Fund is deeply concerned about the abduction of 25</p><p>schoolgirls on 17 November 2025, from the Government Girls Comprehensive Secondary School in Maga, Kebbi State. We extend our heartfelt condolences to the families, school staff, and communities affected by this violent act.</p><p><br></p><p>As an organisation dedicated to protecting the rights and well-being of children, Illmi Children’s Fund strongly condemns this attack, which threatens children’s fundamental right to safe education and violates international conventions on the protection of children, including the UN Convention on the Rights of the Child. We call on</p><p>the Federal Government of Nigeria and the Kebbi State Government to secure the safe and immediate release of all abducted students, hold the perpetrators accountable under national and international law, and strengthen security measures in schools nationwide to ensure that safe learning environments are a right for every child.</p><p><br></p><p>This incident highlights the urgent need for full implementation of Nigeria’s Safe Schools Initiative (SSI), a national programme launched in 2014 following the abduction of the Chibok schoolgirls. The SSI was established to ensure secure and violence-free learning environments, particularly in states affected by conflict</p><p>and banditry. Backed by a dedicated financing plan, it provides strengthened school security, coordination centres, and community engagement to protect students. Illmi Children’s Fund calls on the Federal and Kebbi State Governments, civil society organisations, educational institutions, and international partners to act decisively and collaborate in implementing this existing initiative, ensuring that all children can access education safely.</p><p><br></p><p>Illmi Children’s Fund remains committed to supporting affected children and their families by providing assistance, educational continuity programmes, and advocacy to ensure their voices are heard in decisions that affect their safety and well-being. Every child has the right to learn in safety, and incidents like these remind us of the urgent need to prioritise children’s protection and to hold all stakeholders accountable for safeguarding their rights.</p>', 'https://res.cloudinary.com/dzlolggu9/image/upload/v1763718387/press-releases/rurjd3ekwtgockkhsrzu.webp', 'illmi-childrens-fund-condemns-abduction-of-25-schoolgirls-in-kebbi-state-and-calls-for-immediate-action-to-ensure-their-safe-release-and-protect-schools-700', '2025-11-21 09:44:29.899', 1, 'press-releases/rurjd3ekwtgockkhsrzu');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `image_path` varchar(191) DEFAULT NULL,
  `pdf_path` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `date` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `admin_id` int(11) NOT NULL,
  `image_id` varchar(191) DEFAULT NULL,
  `pdf_id` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `title`, `image_path`, `pdf_path`, `slug`, `date`, `admin_id`, `image_id`, `pdf_id`) VALUES
(8, 'Adolescent Safety in All Spaces (ASIS) Gender Club Report', 'https://res.cloudinary.com/dzlolggu9/image/upload/v1758529900/reports/images/dgtbqhjs8zvxcmeopmk8.webp', 'https://res.cloudinary.com/dzlolggu9/raw/upload/v1758529901/reports/pdfs/wcgpwgsdxbiitg02atpf.pdf', 'adolescent-safety-in-all-spaces-asis-gender-club-report-134', '2025-09-22 08:31:41.966', 1, 'reports/images/dgtbqhjs8zvxcmeopmk8', 'reports/pdfs/wcgpwgsdxbiitg02atpf.pdf'),
(9, 'Training, Advocacy, Research, and Mentorship (TARM) Report', 'https://res.cloudinary.com/dzlolggu9/image/upload/v1758530334/reports/images/zbnl6jyrsdiwj8i394sv.webp', 'https://res.cloudinary.com/dzlolggu9/raw/upload/v1758530335/reports/pdfs/ilq5i0hpglewdcdkwhh0.pdf', 'training-advocacy-research-and-mentorship-tarm-report-719', '2025-09-22 08:38:55.978', 1, 'reports/images/zbnl6jyrsdiwj8i394sv', 'reports/pdfs/ilq5i0hpglewdcdkwhh0.pdf'),
(10, 'Baseline Survey of Basic Education in Selected Fulani Settlements in FCT', 'https://res.cloudinary.com/dzlolggu9/image/upload/v1758542279/reports/images/pyixuris43hbjxhlvixx.webp', 'https://res.cloudinary.com/dzlolggu9/raw/upload/v1758542282/reports/pdfs/bfr3rrytk3blu1hr4knf.pdf', 'baseline-survey-of-basic-education-in-selected-fulani-settlements-in-fct-452', '2025-09-22 11:58:02.925', 1, 'reports/images/pyixuris43hbjxhlvixx', 'reports/pdfs/bfr3rrytk3blu1hr4knf.pdf'),
(11, 'Baseline Assessment of Educational Level of Administrators  in  Selected Almajiri Schools in Kebbi State', 'https://res.cloudinary.com/dzlolggu9/image/upload/v1758542440/reports/images/l0ag8xcnb9dqrtbyyafi.webp', 'https://res.cloudinary.com/dzlolggu9/raw/upload/v1758542441/reports/pdfs/ok4ejwhmetaykjzj82zv.pdf', 'baseline-assessment-of-educational-level-of-administrators-in-selected-almajiri-schools-in-kebbi-state-351', '2025-09-22 12:00:41.974', 1, 'reports/images/l0ag8xcnb9dqrtbyyafi', 'reports/pdfs/ok4ejwhmetaykjzj82zv.pdf'),
(12, 'Annual Report 2025', 'https://res.cloudinary.com/dzlolggu9/image/upload/v1767001688/reports/images/kxevhpqvkdzmn6x9bfdk.webp', 'https://res.cloudinary.com/dzlolggu9/raw/upload/v1767001690/reports/pdfs/k4r3cylgk5zye6xtxwls.pdf', 'annual-report-2025-853', '2025-12-29 09:48:11.111', 1, 'reports/images/kxevhpqvkdzmn6x9bfdk', 'reports/pdfs/k4r3cylgk5zye6xtxwls.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `scholarships`
--

CREATE TABLE `scholarships` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `content` text NOT NULL,
  `image_path` varchar(191) DEFAULT NULL,
  `slug` varchar(191) NOT NULL,
  `date` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `admin_id` int(11) NOT NULL,
  `image_id` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscribers`
--

INSERT INTO `subscribers` (`id`, `email`, `createdAt`) VALUES
(1, 'lerumaquyibe75@gmail.com', '2025-10-22 19:21:41.081'),
(2, 'katutihetuc271@gmail.com', '2025-10-27 13:01:39.156');

-- --------------------------------------------------------

--
-- Table structure for table `volunteer_jobs`
--

CREATE TABLE `volunteer_jobs` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `content` text NOT NULL,
  `image_path` varchar(191) DEFAULT NULL,
  `slug` varchar(191) NOT NULL,
  `date` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `admin_id` int(11) NOT NULL,
  `image_id` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('1ce5b482-7b90-4b04-96f5-c2e8b90946a9', '4fcaab4675b73f150170babe1b9912b76f19c276bd6f7273367f0a6739c50812', '2025-09-18 02:37:19.778', '20250918004629_add_cloudinary_image_id', NULL, NULL, '2025-09-18 02:37:19.642', 1),
('55842cae-2338-4c0e-890f-0f633b696855', '4b20ca045609e5425fed2c8e79f0f3fd06fc7420cbe3f9fdedd1f87fd8d46b0b', '2025-08-31 23:45:51.901', '20250831234551_add_careers_table', NULL, NULL, '2025-08-31 23:45:51.610', 1),
('608a7b53-3e99-477e-b3bf-0feb63d262f5', 'a5f4ebdd67d045571fb4609550c4d36116e7b9527ee4e6878896cad3c8000d7e', '2025-09-05 16:10:37.261', '20250905161036_add_press_releases_table', NULL, NULL, '2025-09-05 16:10:36.547', 1),
('7a9b6b62-0364-4201-bb4b-4bc01f97c5ec', '549a72559868ac8cc043678625c8778f933b7e1547bb5ae1185b2517dd2def11', '2025-09-02 21:27:33.922', '20250902212733_update_content_to_text', NULL, NULL, '2025-09-02 21:27:33.573', 1),
('8ea78c71-f797-4532-bd71-2098b4b20760', 'e34d5af25e108328b2d23e2757c3035c6d98a0522638cc056b2d808e764225e5', '2025-09-06 23:42:37.266', '20250906234237_add_reports_table', NULL, NULL, '2025-09-06 23:42:37.067', 1),
('9f0bce27-0f02-4aff-a793-34172be71ec1', 'a797fa416402346ae3b5df0720ef877b52873f2102c02a6bc24707568d1650c4', '2026-04-04 04:21:18.686', '20260403232857_add_newsletter_issues', NULL, NULL, '2026-04-04 04:21:18.645', 1),
('cb3af66f-cccd-456a-8fc0-5a2f3d78f19c', 'b3317f984303963cfa1afde3cd551c44665d741e84cd3584e0645aa8e6010f3a', '2025-08-30 22:20:56.285', '20250830215727_init', NULL, NULL, '2025-08-30 22:20:56.037', 1),
('f9059751-d38e-487f-ac6a-30f8ce138d73', '51381c9cf739a1046616bce646393324f64afef6c2e2aca98be9a1a4fd61677c', '2025-09-25 23:56:13.935', '20250925222252_add_subscribers_table', NULL, NULL, '2025-09-25 23:56:13.921', 1),
('fbf8151c-b174-44c2-af3e-0a227b1307d2', 'e002b844e824ae16a316412a1ab5b7005857b2a4d1232169afb0fe46b13f663e', '2025-09-05 13:37:20.787', '20250905133719_add_scholarships_table', NULL, NULL, '2025-09-05 13:37:19.953', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admins_username_key` (`username`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `blogs_slug_key` (`slug`),
  ADD KEY `blogs_author_id_fkey` (`author_id`);

--
-- Indexes for table `careers`
--
ALTER TABLE `careers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `careers_slug_key` (`slug`),
  ADD KEY `careers_admin_id_fkey` (`admin_id`);

--
-- Indexes for table `newsletter_issues`
--
ALTER TABLE `newsletter_issues`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `newsletter_issues_slug_key` (`slug`),
  ADD KEY `newsletter_issues_admin_id_fkey` (`admin_id`);

--
-- Indexes for table `press_releases`
--
ALTER TABLE `press_releases`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `press_releases_slug_key` (`slug`),
  ADD KEY `press_releases_admin_id_fkey` (`admin_id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reports_slug_key` (`slug`),
  ADD KEY `reports_admin_id_fkey` (`admin_id`);

--
-- Indexes for table `scholarships`
--
ALTER TABLE `scholarships`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `scholarships_slug_key` (`slug`),
  ADD KEY `scholarships_admin_id_fkey` (`admin_id`);

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subscribers_email_key` (`email`);

--
-- Indexes for table `volunteer_jobs`
--
ALTER TABLE `volunteer_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `volunteer_jobs_slug_key` (`slug`),
  ADD KEY `volunteer_jobs_admin_id_fkey` (`admin_id`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `careers`
--
ALTER TABLE `careers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `newsletter_issues`
--
ALTER TABLE `newsletter_issues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `press_releases`
--
ALTER TABLE `press_releases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `scholarships`
--
ALTER TABLE `scholarships`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `volunteer_jobs`
--
ALTER TABLE `volunteer_jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `admins` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `careers`
--
ALTER TABLE `careers`
  ADD CONSTRAINT `careers_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `newsletter_issues`
--
ALTER TABLE `newsletter_issues`
  ADD CONSTRAINT `newsletter_issues_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `press_releases`
--
ALTER TABLE `press_releases`
  ADD CONSTRAINT `press_releases_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `scholarships`
--
ALTER TABLE `scholarships`
  ADD CONSTRAINT `scholarships_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `volunteer_jobs`
--
ALTER TABLE `volunteer_jobs`
  ADD CONSTRAINT `volunteer_jobs_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
