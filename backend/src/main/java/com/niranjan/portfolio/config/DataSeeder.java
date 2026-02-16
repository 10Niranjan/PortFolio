package com.niranjan.portfolio.config;

import com.niranjan.portfolio.model.Project;
import com.niranjan.portfolio.model.Skill;
import com.niranjan.portfolio.repository.ProjectRepository;
import com.niranjan.portfolio.repository.SkillRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;

    public DataSeeder(ProjectRepository projectRepository, SkillRepository skillRepository) {
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
    }

    @Override
    public void run(String... args) {
        if (projectRepository.count() == 0) {
            seedProjects();
        }
        if (skillRepository.count() == 0) {
            seedSkills();
        }
    }

    private void seedProjects() {
        projectRepository.save(new Project(
                "IndShield",
                "Industrial Safety Web Application using YOLOv8, MediaPipe, and OpenCV for real-time detection. Features gesture-based alerts, safety gear detection, and restricted zone monitoring with live CCTV feeds.",
                "#",
                "Deployed",
                "Flask,Python,YOLOv8,OpenCV,TensorFlow",
                "from-red-500/20 via-orange-500/10 to-transparent",
                1));

        projectRepository.save(new Project(
                "Fanclub Cricket App",
                "A platform for cricket enthusiasts with live scores, match schedules, player statistics, fan polls, chat rooms, and event notifications. Built with Flutter for a smooth cross-platform experience.",
                "#",
                "Deployed",
                "Flutter,Dart,Firebase,REST API",
                "from-emerald-500/20 via-green-500/10 to-transparent",
                2));

        projectRepository.save(new Project(
                "To-Do List Application",
                "Full-featured task management app with create, update, view, and delete operations. Each task includes title, description, due date, and status tracking. Built with Java Swing/JavaFX.",
                "#",
                "Deployed",
                "Java,JavaFX,Swing,MySQL",
                "from-blue-500/20 via-indigo-500/10 to-transparent",
                3));

        projectRepository.save(new Project(
                "Portfolio Website",
                "This very website! A full-stack portfolio built with Astro, React, TypeScript & TailwindCSS on the frontend, and Java Spring Boot with PostgreSQL on the backend.",
                "#",
                "Live",
                "Astro,React,Spring Boot,PostgreSQL",
                "from-violet-500/20 via-purple-500/10 to-transparent",
                4));

        System.out.println("✅ Seeded 4 projects");
    }

    private void seedSkills() {
        // Languages
        String[] languages = { "Java", "JavaScript", "TypeScript", "C#", "Dart", "HTML", "CSS", "Python" };
        for (int i = 0; i < languages.length; i++) {
            skillRepository.save(new Skill(languages[i], "Languages", i + 1));
        }

        // Frameworks
        String[] frameworks = { "Spring Boot", "Flutter", "React", "Astro", ".NET", "ASP.NET MVC", "Flask" };
        for (int i = 0; i < frameworks.length; i++) {
            skillRepository.save(new Skill(frameworks[i], "Frameworks", i + 1));
        }

        // Tools & DB
        String[] tools = { "MySQL", "PostgreSQL", "Git & GitHub", "IntelliJ IDEA", "VS Code", "Android Studio",
                "Gradle" };
        for (int i = 0; i < tools.length; i++) {
            skillRepository.save(new Skill(tools[i], "Tools", i + 1));
        }

        System.out.println("✅ Seeded " + (languages.length + frameworks.length + tools.length) + " skills");
    }
}
