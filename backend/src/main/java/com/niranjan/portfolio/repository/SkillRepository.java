package com.niranjan.portfolio.repository;

import com.niranjan.portfolio.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findAllByOrderByDisplayOrderAsc();

    List<Skill> findByCategoryOrderByDisplayOrderAsc(String category);
}
