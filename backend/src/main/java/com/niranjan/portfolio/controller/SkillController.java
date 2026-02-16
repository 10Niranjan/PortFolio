package com.niranjan.portfolio.controller;

import com.niranjan.portfolio.model.Skill;
import com.niranjan.portfolio.repository.SkillRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillRepository skillRepository;

    public SkillController(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {
        return ResponseEntity.ok(skillRepository.findAllByOrderByDisplayOrderAsc());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Skill>> getSkillsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(skillRepository.findByCategoryOrderByDisplayOrderAsc(category));
    }
}
